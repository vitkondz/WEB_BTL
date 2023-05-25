import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import {
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
// import { NavLink } from "react-router-dom";
function NavLinkContext() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (JSON.parse(Cookies.get('info')).type_of_account === 'admin') {
      setAuth(true);
    }
  }, [])

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
    <>
      {auth
        &&
        <div>
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
        </div>
      }
      {!auth &&
        <div>
          <Nav navbar>
            <NavItem>
              <NavLink to="/track" tag={Link} onClick={() => handleNavLinkClick()}>
                Theo dõi
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/registry" tag={Link} onClick={() => handleNavLinkClick()}>
                Đăng kiểm
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav>
              <DropdownToggle
                aria-haspopup={true}
                caret
                color="default"
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                nav
                onClick={e => e.preventDefault()}
              >
                Tài khoản
              </DropdownToggle>
              <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                <DropdownItem
                  to="/info" tag={Link}
                  onClick={() => handleNavLinkClick()}
                >
                  Thông tin
                </DropdownItem>
                <DropdownItem
                  to="/login" tag={Link}
                  onClick={handleLogout}
                >
                  Thoát
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </div>
      }
    </>

  )
}

export default NavLinkContext;