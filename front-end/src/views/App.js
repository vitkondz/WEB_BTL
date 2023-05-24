import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";

// pages for this kit
import Index from "views/pages/Index";
import Analysis from "views/pages/statistic/analysis/Analysis";
import List from "views/pages/statistic/list/List";
import Manage from "views/pages/manage/Manage";
import Center from "views/pages/manage/centerList/Center";
import Login from "views/pages/Login";
import Statistic from "views/pages/statistic/Statistic";
import ProtectedRoute from "views/ProtectedRoute";
import UserRoute from "views/UserRoute";
import { dividerClasses } from "@mui/material";
import Forecast from "./pages/statistic/forecast/Forecast";
import Account from "./pages/manage/account/Account";
import Data from "./pages/manage/data/Data";
import CenterInfo from "./pages/manage/account/updateCenter/CenterInfo";
// const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Index />} />
          <Route
            path="statistic"
            element={<Statistic />}
          >
            <Route index element={<Analysis />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="list" element={<List />} />
            <Route path="forecast" element={<Forecast />} />
            <Route element={<UserRoute />}>
              <Route path="warning" element={<div>User Route</div>} />
            </Route>
          </Route>
          <Route
            path="manage"
            element={<Manage />}
          >
            <Route path="data" element={<Data />} />
            <Route path="center" element={<Center />} />
            <Route path="account" element={<Account />} />
            <Route path="account/:centerId" element={<CenterInfo />} />
          </Route>
        </Route>


        <Route
          path="/login"
          element={<Login />}
        />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter >
  )
}

export default App;
