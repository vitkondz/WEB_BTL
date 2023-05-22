import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from "react"
import axiosInstance from 'functions/AxiosInstance';
import Cookies from 'js-cookie';

export default function List() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getCarOwner();

  }, []);

  const getCarOwner = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,
    })
    setData(response.data.owners);

    console.log("check dataOwners", data);
    console.log("check data", response.data.owners)

  }

  const columns = [
    { field: "owner_id", headerName: "ID", width: 115 },
    { field: "owner_name", headerName: "Họ tên", width: 200 },
    { field: "owner_address", headerName: "Địa chỉ", width: 350 },
    {
      field: "type_of_ownership",
      headerName: "Status",
      width: 100,
    },
    {
      field: "contact_number",
      headerName: "Số điện thoại",
      width: 120,
    },
    {
      field: "registration_number",
      headerName: "Mã đăng kiểm",
      width: 150,
    }
  ];
  return (

    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.registration_number}
        slots={{ toolbar: GridToolbar }}
        sx={{ overflowX: 'scroll' }}
      />
    </div>
  );
}
