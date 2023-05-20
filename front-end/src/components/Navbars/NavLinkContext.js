import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";

import {
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
// import { NavLink } from "react-router-dom";
function NavLinkContext() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt');
    Cookies.remove('info');

    navigate('/');
  }
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
    <Nav navbar>
      <NavItem>
        <NavLink to="/" tag={Link} onClick={() => handleNavLinkClick()}>
          Trang chủ
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/statistic" tag={Link} onClick={() => handleNavLinkClick()}>
          Thống kê
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/manage" tag={Link} onClick={() => handleNavLinkClick()}>
          Quản lý
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/login" tag={Link}
          onClick={handleLogout}
        >
          Thoát
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default NavLinkContext;