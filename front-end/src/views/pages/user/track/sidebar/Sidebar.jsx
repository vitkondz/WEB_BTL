import React from 'react';
import "assets/css/Sidebar.css";
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
function Sidebar() {
  return (
    <>
      <div className='sidebar'>
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Theo dõi</h3>
            <ul className="sidebarList">
              <NavLink to="analysis" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons business_chart-bar-32"></i>
                  Phân tích
                </li>
              </NavLink>
              <NavLink to="carlist" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons shopping_delivery-fast"></i>
                  Theo dõi xe
                </li>
              </NavLink>
              <NavLink to="registration" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons education_agenda-bookmark"></i>
                  Lượt đăng kiểm
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