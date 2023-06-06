import React from 'react';
import "assets/css/Sidebar.css";
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavLink
} from "reactstrap";

function Sidebar() {
  const isTokenExpired = (token) => {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Chia cho 1000 để chuyển đổi từ milliseconds sang giây
    return decodedToken.exp < currentTime;
  };

  const handleNavLinkClick = () => {
    if (isTokenExpired(Cookies.get('jwt'))) {
      window.location.reload();
    }
  };
  return (
    <>
      <div className='sidebar'>
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Thống kê</h3>
            <ul className="sidebarList">
              <NavLink to="analysis" tag={Link} onClick={() => handleNavLinkClick()}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons business_chart-bar-32"></i>
                  Phân tích
                </li>
              </NavLink>
              <NavLink to="list" tag={Link} onClick={() => handleNavLinkClick()}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons files_paper"></i>
                  Danh sách
                </li>
              </NavLink>
              <NavLink to="forecast" tag={Link} onClick={() => handleNavLinkClick()}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons education_atom"></i>
                  Dự báo
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
      <UncontrolledDropdown className="dropdownSidebar">
        <DropdownToggle
          aria-expanded={false}
          aria-haspopup={true}
          caret
          color="info"
          data-toggle="dropdown"
          id="dropdownMenuButton"
          type="button"
        >
          Thống kê
        </DropdownToggle>
        <DropdownMenu aria-labelledby="dropdownMenuButton">
          <DropdownItem to="analysis" tag={Link} onClick={() => handleNavLinkClick()}>
            <i className="sidebarIcon now-ui-icons business_chart-bar-32"></i>
            Phân tích
          </DropdownItem>
          <DropdownItem to="list" tag={Link} onClick={() => handleNavLinkClick()}>
            <i className="sidebarIcon now-ui-icons files_paper"></i>
            Danh sách
          </DropdownItem>
          <DropdownItem to="forecast" tag={Link} onClick={() => handleNavLinkClick()}>
            <i className="sidebarIcon now-ui-icons education_atom"></i>
            Dự báo
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default Sidebar;