import Chart from "components/chart/Chart";

import "./Analysis.css";

import { useEffect, useState } from "react";
import axios from "axios";
import filter from "functions/timeFiler";
import Filter from "components/filter/Filter";


export default function Analysis(props) {
  const [yearData, setYearData] = useState([]);
  const [quarterData, setQuarterData] = useState([]);
  const [monthData, setMonthData] = useState([]);

  const [area, setArea] = useState(false)
  const [province, setProvince] = useState(false)
  const [year, setYear] = useState(2022)
  const [center, setCenter] = useState(false)


  useEffect(() => {
    getCarRegistrationNumber();
  }, [area, province, year, center]);

  const getCarRegistrationNumber = async () => {
    let response0 = await axios({
      
      method: 'post',
      url: "http://localhost:3010/login",
      data: {
        username: 'admin',
        password: 'abc123'
      },
    });
    const token = response0.data.result;

    let response = await axios({
      headers: {
        "Content-Type": "application/json",
        "Authorization": token, 
      },
      method: 'post',
      url: "http://localhost:3010/account/login",
      data: {
        username: 'admin',
        password: 'abc123'
      },

    });
    console.log("check response", response);
    console.log("check tinh", await filter(response.data.registrations, response.data.center, year, false, center, false, false));
    setMonthData(await filter(response.data.registrations, response.data.center, year, false, center, province, area));
    setQuarterData(await filter(response.data.registrations, response.data.center, year, true, center, province, area));

    setYearData(await filter(response.data.registrations, response.data.center, true, false, center, province, area));

  }

  return (
    <div className="home">
      <Filter
        setArea={setArea}
        setProvince={setProvince}
        setYear={setYear}
        setCenter={setCenter}
      />
      <div>Check Area: {area}</div>
      <div>Check Province: {province}</div>
      <div>Check Year: {year}</div>
      <div>Check Center: {center}</div>
      {/* <FeaturedInfo /> */}
      <Chart data={yearData} title="Years Analytics" grid dataKey="quantity" kind="year" />
      <div>
        <Chart data={quarterData} title="Quarters Analytics" grid dataKey="quantity" kind="quarter" />
        <Chart data={monthData} title="Months Analytics" grid dataKey="quantity" kind="month" />
      </div>
    </div>
  );
}
