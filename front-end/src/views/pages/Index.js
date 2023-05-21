import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"


import MainNavbar from "components/Navbars/MainNavbar";
import MainNavBarForUser from "components/Navbars/MainNavBarForUser";

function Index() {
  return (
    <div>
      {
        (Cookies.get('info')) && JSON.parse(Cookies.get('info')).type_of_account === 'admin' ?
          <div>
            <MainNavbar />
      
          </div>
          :
          <div>
            <MainNavBarForUser />

          </div>
      }
    </div>

  )
}

export default Index;