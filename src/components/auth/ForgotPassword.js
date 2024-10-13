import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const ForgotPassword = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Formik form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      setMessage(null);
      try {
        // Firebase function to send reset password email
        await sendPasswordResetEmail(auth, values.email);
        setMessage("Password reset email sent. Please check your inbox.");
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          setError("No account found with this email.");
        } else {
          setError("Failed to send reset email. Please try again later.");
        }
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={formik.handleSubmit} className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Forgot Password</h2>

        {message && <div className="mb-4 p-2 bg-green-500 text-white rounded">{message}</div>}
        {error && <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>}

        <input
          name="email"
          className="w-full mb-3 p-2 border rounded"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}

        <button className="w-full p-2 bg-blue-500 text-white rounded" type="submit">
          Reset Password
        </button>

        <p className="mt-3 text-sm">
          Remembered your password? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;