import React from "react";
import FixedNavbar from "components/Navbars/FixedNavbar";
import {Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import "./Statistic.css";
function Statistic() {
  return (
    <>
      <FixedNavbar />
      <div className="spaceHeader"></div>
      <div className="bodyContainer">
        <Sidebar />
        <div className="others">
          <Outlet />
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

export default Statistic;