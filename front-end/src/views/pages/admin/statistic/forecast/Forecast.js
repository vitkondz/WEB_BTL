import React from 'react'
import axiosInstance from 'functions/AxiosInstance';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import nearlyExpiredFilter from 'functions/nearlyExpiredFilter';
import BieChart from 'components/chart/PieChart';
import ForecastFilter from 'components/filter/ForecastFilter';

const Forecast = () => {
  const [data, setData] = useState([]);

  const [area, setArea] = useState(false)
  const [province, setProvince] = useState(false)
  const [center, setCenter] = useState(false)

  const [dataForPie, setDataForPie] = useState([])

  useEffect(() => {
    getForecast();
    getNearlyExpired();
  }, [area, province, center]);

  const getNearlyExpired = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,
    })
    //day la du lieu dang kiem het han, m xem lam cai bang nhe (hien bang nay nen co cot ngay het han). M lam ca cai bang xe het han cho trung tam nua nhe, copy y het
    // setData(await nearlyExpiredFilter(response.data.registrations))
    // console.log(await nearlyExpiredFilter(response.data.registrations))
  }

  const getForecast = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'post',
      url: `http://localhost:3010/registry/forecast`,
      data: {
        center_id: center,
        province: province,
        area: area
      }
    })
    console.log(response.data);
    let tmp = [
          { name: "Đăng kiểm lại", value: response.data.re_Registrations },
          { name: "Đăng kiểm mới", value: response.data.new_registrations },
    ]
    setDataForPie(tmp); 
  }
  return (
    <div>
      <h3>Forecast</h3>
      <ForecastFilter
        setArea={setArea}
        setProvince={setProvince}
        setCenter={setCenter}
      />
      {/* <div>Check Area: {area}</div>
      <div>Check Province: {province}</div>
      <div>Check Center: {center}</div> */}
      <BieChart dataForPie={dataForPie} />
      <p>Dự báo: Danh sách xe sắp hết hạn, dự báo xe đăng kiểm mới và đăng kiểm lại</p>
    </div>
  )
}

export default Forecast