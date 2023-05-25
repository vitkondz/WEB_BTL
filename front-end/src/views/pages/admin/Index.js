import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"


import MainNavbar from "components/Navbars/MainNavbar";

function Index() {
  return (
    <div>
      <MainNavbar />
    </div>

  )
}

export default Index;