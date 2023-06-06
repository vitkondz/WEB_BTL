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
            <h3 className="sidebarTitle">Quản lý</h3>
            <ul className="sidebarList">
              <NavLink to="data" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons arrows-1_cloud-upload-94"></i>
                  Dữ liệu
                </li>
              </NavLink>
              <NavLink to="center" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons business_badge"></i>
                  Trung tâm
                </li>
              </NavLink>
              <NavLink to="account" tag={Link}>
                <li className="sidebarListItem">
                  <i className="sidebarIcon now-ui-icons users_single-02"></i>
                  Tài khoản
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
          Quản lý
        </DropdownToggle>
        <DropdownMenu aria-labelledby="dropdownMenuButton">
          <DropdownItem to="data" tag={Link} onClick={() => handleNavLinkClick()}>
            <i className="sidebarIcon now-ui-icons arrows-1_cloud-upload-94"></i>
            Dữ liệu
          </DropdownItem>
          <DropdownItem to="center" tag={Link} onClick={() => handleNavLinkClick()}>
            <i className="sidebarIcon now-ui-icons business_badge"></i>
            Trung tâm
          </DropdownItem>
          <DropdownItem to="account" tag={Link} onClick={() => handleNavLinkClick()}>
            <i className="sidebarIcon now-ui-icons users_single-02"></i>
            Tài khoản
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default Sidebar;