import React from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
function Sidebar() {
  return (
    <>
      <div className='sidebar'>
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quản lý</h3>
            <ul className="sidebarList">
              <NavLink to="data" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons business_chart-bar-32"></i>
                  Dữ liệu
                </li>
              </NavLink>
              <NavLink to="center" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons files_paper"></i>
                  Trung tâm
                </li>
              </NavLink>
              <NavLink to="account" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons education_atom"></i>
                  Tài khoản
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>

    </>
  )
}

export default Sidebar;