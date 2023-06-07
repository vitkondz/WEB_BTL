import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from "react"
import axiosInstance from 'functions/AxiosInstance';
import Cookies from 'js-cookie';
import { Button } from 'reactstrap';

export default function List() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getCar();

  }, []);

  const getCar = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,
    })
    setData(response.data.cars);

    console.log("check dataCar", data);
    console.log("check data", response.data);

  }

  const columns = [
    { field: "number_plate", headerName: "Biển xe", width: 115 },
    { field: "car_name", headerName: "Hãng xe", width: 130 },
    { field: "province", headerName: "Tỉnh thành", width: 115 },
    { field: "owner_name", headerName: "Chủ xe", width: 315, headerAlign: 'center' },
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
            >
              Detail
            </Button>

          </div>
        )
      }
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
