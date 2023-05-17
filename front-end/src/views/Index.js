import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"


import MainNavbar from "components/Navbars/MainNavbar";
import Login from "./Login";
import MainNavBarForUser from "components/Navbars/MainNavBarForUser";

function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      headers: {
        "Content-Type": "application/json",
        "Authorization": Cookies.get('jwt'),
        // "Authorization": 'ádada',
      },
      method: 'post',
      url: "http://localhost:3010/account/login",
      data: {
        username: 'admin',
        password: 'abc123'
      },
    })
      .then(res => {
        console.log(res.status);
        console.log(res.data);


      })
      .catch((error) => {

        console.log(error.message);
      })
  })

  const handleBackToLogin = () => {
    navigate('/login')
  }
  return (
    <div>
      {
        (Cookies.get('info')) && JSON.parse(Cookies.get('info')).type_of_account === 'admin' ?
          <div>
            <MainNavbar />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
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