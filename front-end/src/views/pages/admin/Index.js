import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"


import MainNavbar from "components/Navbars/MainNavbar";
import TransparentFooter from "components/Footer/TransparentFooter";

function Index() {
  return (
    <div>
      <MainNavbar />
      <TransparentFooter/>
    </div>

  )
}

export default Index;