import Chart from "components/chart/Chart";

import "./Analysis.css";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Filter from "components/filter/Filter";
import filter from "functions/timeFiler";
import { useNavigate } from "react-router-dom";
import axiosInstance from "functions/AxiosInstance";
import FilterForUser from "components/filter/FilterForUser";
import { ResponsiveContainer } from "recharts";


export default function Analysis(props) {
  const [yearData, setYearData] = useState([]);
  const [quarterData, setQuarterData] = useState([]);
  const [monthData, setMonthData] = useState([]);

  const [area, setArea] = useState(false)
  const [province, setProvince] = useState(false)
  const [year, setYear] = useState(2023)
  const [center, setCenter] = useState(false)

  const [centerInfo, setCenterInfo] = useState([])

  useEffect(() => {
    getCarRegistrationNumber();
  }, [area, province, year, center]);

  const getCarRegistrationNumber = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,

    })

    setCenterInfo(response.data.center)

    setMonthData(await filter(response.data.registrations, response.data.center, year, false, center, province, area));
    setQuarterData(await filter(response.data.registrations, response.data.center, year, true, center, province, area));
    setYearData(await filter(response.data.registrations, response.data.center, true, false, center, province, area));

  }

  return (
    <>
      <div className="home">
        {
          (Cookies.get('info')) && JSON.parse(Cookies.get('info')).type_of_account === 'admin' ?
            <Filter
              setArea={setArea}
              setProvince={setProvince}
              setYear={setYear}
              setCenter={setCenter}
              centerInfo={centerInfo}
            />
            :
            <FilterForUser
              setYear={setYear}
            />
        }

        <div>
          <Chart year={year !== 0 ? year : ' '} data={monthData} title="Thống kê theo tháng" grid dataKey="quantity" kind="month" />
          <Chart year={year !== 0 ? year : ' '} data={quarterData} title="Thống kê theo quý" grid dataKey="quantity" kind="quarter" />
        </div>

        <Chart year={' '} data={yearData} title="Thống kê theo các năm" grid dataKey="quantity" kind="year" />

      </div>
    </>

  );
}