import Chart from "components/chart/Chart";

import "./Analysis.css";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Filter from "components/filter/Filter";
import filter from "functions/timeFiler";
import { useNavigate } from "react-router-dom";
import axiosInstance from "functions/AxiosInstance";
import FilterForUser from "components/filter/FilterForUser";


export default function AnalysisUser(props) {
  const [yearData, setYearData] = useState([]);
  const [quarterData, setQuarterData] = useState([]);
  const [monthData, setMonthData] = useState([]);

  const [area, setArea] = useState(false)
  const [province, setProvince] = useState(false)
  const [year, setYear] = useState(2022)
  const [center, setCenter] = useState(false)

  useEffect(() => {
    getNumberOfCarRegistered();
  }, [area, province, year, center]);

  const getNumberOfCarRegistered = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,

    })

    // console.log("check tinh", await filter(response.data.registrations, response.data.center, year, false, center, false, false));
    setMonthData(await filter(response.data.registrations, response.data.center, year, false, center, province, area));
    setQuarterData(await filter(response.data.registrations, response.data.center, year, true, center, province, area));
    setYearData(await filter(response.data.registrations, response.data.center, true, false, center, province, area));

  }

  return (
    <div className="home">

      <FilterForUser
        setYear={setYear}
      />

      {/* <div>Check Area: {area}</div>
      <div>Check Province: {province}</div>
      <div>Check Year: {year}</div>
      <div>Check Center: {center}</div> */}


      <div>
        <Chart year={year !== 0 ? year : ' '} data={monthData} title="Thống kê theo tháng" grid dataKey="quantity" kind="month" />
        <Chart year={year !== 0 ? year : ' '} data={quarterData} title="Thống kê theo quý" grid dataKey="quantity" kind="quarter" />
      </div>
      <Chart year={' '} data={yearData} title="Thống kê theo các năm" grid dataKey="quantity" kind="year" />
    </div>
  );
}