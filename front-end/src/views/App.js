import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";

// pages for this kit
import Index from "views/pages/admin/Index";
import Analysis from "views/pages/admin/statistic/analysis/Analysis";
import List from "views/pages/admin/statistic/list/List";
import Manage from "views/pages/admin/manage/Manage";
import Center from "views/pages/admin/manage/centerList/Center";
import Login from "views/pages/Login";
import Statistic from "views/pages/admin/statistic/Statistic";
import ProtectedRoute from "views/ProtectedRoute";
import UserRoute from "views/UserRoute";
import { dividerClasses } from "@mui/material";
import Forecast from "./pages/admin/statistic/forecast/Forecast";
import Account from "./pages/admin/manage/account/Account";
import CenterInfo from "./pages/admin/manage/account/updateCenter/CenterInfo";
import CSV from "./pages/admin/manage/csv/CSV";
import AdminRoute from "./AdminRoute";
import CreateAccount from "./pages/admin/manage/account/createAccount/CreateAccount";
import Track from "./pages/user/track/Track";
import CarList from "./pages/user/track/carList/CarList";
import AnalysisUser from "./pages/user/track/analysisUser/AnalysisUser";
import RegistrationTrack from "./pages/user/track/registration/RegistrationTrack";
import Registry from "./pages/user/registry/Registry";
import InfoUser from "./pages/user/infoUser/InfoUser";
import PageNotFound from "./pages/PageNotFound";
import IndexUser from "./pages/user/IndexUser";

// const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminRoute />}>
            <Route path='/' element={<Index />} />
            <Route path="statistic" element={<Statistic />}>
              <Route index element={<Analysis />} />
              <Route path="analysis" element={<Analysis />} />
              <Route path="list" element={<List />} />
              <Route path="forecast" element={<Forecast />} />
            </Route>
            <Route path="manage" element={<Manage />}>
              <Route path="data" element={<CSV />} />
              <Route path="center" element={<Center />} />
              <Route path="account" element={<Account />} />
              <Route path="create" element={<CreateAccount />} />
              <Route path="account/:centerId" element={<CenterInfo />} />
            </Route>
          </Route>
          <Route element={<UserRoute />}>
            <Route path="track" element={<Track />}>
              <Route index element={<IndexUser/>}/>
              <Route path="analysis" element={<AnalysisUser />} />
              <Route path="carlist" element={<CarList />} />
              <Route path="registration" element={<RegistrationTrack />} />
            </Route>
            <Route path="registry" element={<Registry />} />
            <Route path="info" element={<InfoUser/>} />
          </Route>

        </Route>


        <Route
          path="/login"
          element={<Login />}
        />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter >
  )
}

export default App;
