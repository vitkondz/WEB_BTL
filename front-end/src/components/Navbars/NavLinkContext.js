import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"

import {
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
function NavLinkContext() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt');
    Cookies.remove('info');

    navigate('/');
  }
  
  return (
    <Nav navbar>
      <NavItem>
        <NavLink to="/" tag={Link}>
          Trang chủ
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/statistic" tag={Link}>
          Thống kê
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/manage" tag={Link}>
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