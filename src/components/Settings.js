import React, { useState} from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
};

export default Settings;