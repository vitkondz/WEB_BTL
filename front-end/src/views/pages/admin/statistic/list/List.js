import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from "react"
import axiosInstance from 'functions/AxiosInstance';
import Cookies from 'js-cookie';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import DetailFilter from 'components/filter/DetailFilter';
import timeListFilter from 'functions/timeListFilter';

export default function List() {
  const [area, setArea] = useState(false)
  const [province, setProvince] = useState(false)
  const [center, setCenter] = useState(false)
  const [year, setYear] = useState(false)
  const [quarter, setQuarter] = useState(false)
  const [month, setMonth] = useState(false)

  const [data, setData] = useState([]);
  useEffect(() => {
    getCar();

  }, [area, province, year, center, quarter, month]);

  const getCar = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,
    })
    setData(await timeListFilter(response.data.registrations, response.data.center, year, quarter, month, center, province, area));
    console.log(year, " ", quarter, " ", month)
    console.log("check filter detail", await timeListFilter(response.data.registrations, response.data.center, year, quarter, month, center, province, area));
    console.log(center, " ", area, " ", province)
    // console.log("checkall", response.data);
  }

  const columns = [
    { field: "number_plate", headerName: "Biển xe", width: 115 },
    { field: "date_issued", headerName: "Ngày đăng kiểm", width: 130 },
    { field: "date_expired", headerName: "Hết hạn", width: 115 },
    { field: "owner_name", headerName: "Chủ xe", width: 315, headerAlign: 'center' },
    { field: "center_name", headerName: "Nơi đăng kiểm", width: 315, headerAlign: 'center' },
    // { field: "registration_number", headerName: "Nơi đăng kiểm", width: 315, headerAlign: 'center' },
    {
      field: "action",
      headerName: "",
      width: 125,
      renderCell: (params) => {
        return (
          <div>
            <Button
              color="info"
              className="btn-round"
              type="button"
              to={"/statistic/list/" + params.row.number_plate}
              tag={Link}
            >
              Chi tiết
            </Button>

          </div>
        )
      }
    }
  ];
  return (

    <div style={{ height: 600, width: '100%' }}>
      <DetailFilter
        setArea={setArea}
        setProvince={setProvince}
        setYear={setYear}
        setCenter={setCenter}
        setMonth={setMonth}
        setQuarter={setQuarter}
      />
      {/* <div>Check Area: {area}</div>
      <div>Check Province: {province}</div>
      <div>Check Year: {year}</div>
      <div>Check Center: {center}</div>
      <div>Check Month: {month}</div>
      <div>Check quarter: {quarter}</div> */}
      <DataGrid
        rows={data}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        sx={{ overflowX: 'scroll' }}
        getRowId={(row) => row.registration_number}
      />
    </div>
  );
}
