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
            <h3 className="sidebarTitle">Thống kê</h3>
            <ul className="sidebarList">
              <NavLink to="analysis" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons business_chart-bar-32"></i>
                  Phân tích
                </li>
              </NavLink>
              <NavLink to="list" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons files_paper"></i>
                  Danh sách
                </li>
              </NavLink>
              <NavLink to="warning" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons education_atom"></i>
                  Cảnh báo
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