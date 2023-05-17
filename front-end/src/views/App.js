import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";

// pages for this kit
import Index from "views/Index";
import Analysis from "views/statistic/analysis/Analysis";
import List from "views/statistic/list/List";
import Warning from "views/statistic/warning/Warning";
import Manage from "views/manage/Manage";
import Center from "views/manage/center/Center";
import Login from "views/Login";
import Statistic from "views/statistic/Statistic";
import ProtectedRoute from "views/ProtectedRoute";
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
                        <Route path="analysis" element={<Analysis />} />
                        <Route path="list" element={<List />} />
                        <Route path="warning" element={<Warning />} />
                    </Route>
                    <Route
                        path="manage"
                        element={<Manage />}

                    >
                        <Route path="center" element={<Center />} />
                    </Route>
                </Route>


                <Route
                    path="/login"
                    element={<Login />}
                />

            </Routes>
        </BrowserRouter >
    )
}

export default App;
