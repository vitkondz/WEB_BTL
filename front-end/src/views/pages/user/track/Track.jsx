import React from "react";
import Sidebar from "./sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import FixedNavbarUser from "components/Navbars/FixedNavbarUser";
function Track() {
  return (
    <>
      <FixedNavbarUser />
      <div className="spaceHeader"></div>
      <div className="bodyContainer">
        <Sidebar />
        <div className="others">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default Track;