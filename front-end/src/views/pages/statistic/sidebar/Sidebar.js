import React from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

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
              <NavLink to="analysis" tag={Link}>
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
              <NavLink to="warning" tag={Link} onClick={() => handleNavLinkClick()}>
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