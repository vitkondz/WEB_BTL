import React from "react";
import FixedNavbar from "components/Navbars/FixedNavbar";
import Sidebar from "./sidebar/Sidebar";
import "./manage.css";
import { Outlet } from "react-router-dom";
function Manage() {
  return (
    <>
      <FixedNavbar />
      <div className="spaceHeader"></div>
      <div className="bodyContainer">
        <Sidebar />
        <div className="others">
          <Outlet/>
          other contents
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br />
        </div>
      </div>
    </>
  )
}

export default Manage;