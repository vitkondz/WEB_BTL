import React from "react";
import FixedNavbar from "components/Navbars/FixedNavbar";
import {Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
function Statistic() {
  return (
    <>
      <FixedNavbar />
      <div className="spaceHeader"></div>
      <div className="bodyContainer">
        <Sidebar />
        <div className="others">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Statistic;