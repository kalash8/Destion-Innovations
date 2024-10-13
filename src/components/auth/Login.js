import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, signInWithPopup } from "../../firebase/firebaseConfig";

const Login = () => {
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/dashboard");
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          setError("No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else {
          setError("Login failed. Please try again later.");
        }
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>

        {error && <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>}

        <div className="space-y-4">
            <div>
                <label className="block mb-1 text-gray-600">Username/Email</label>
                <input
                name="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                placeholder="Enter your username"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
            </div>
            <div>
                <label className="block mb-1 text-gray-600">Password</label>
                <input
                name="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
            </div>
            <div className="flex justify-center items-center">
                <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-full text-lg px-5 py-2.5 text-center me-2 mb-2" type="submit">
                Login
                </button>
            </div>
            <div className="flex justify-center items-center">
                <button type="button" onClick={handleGoogleLogin} class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-full text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
                </svg>
                Login in with Google
                </button>
            </div>

        <div className="mt-3 text-sm text-center">
          <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
        </div>

        <p className="mt-3 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
        </div>
      </form>
    </div>
  );
};

export default Login;