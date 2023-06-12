import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from 'functions/AxiosInstance';
import {
  Button,
  NavLink
} from "reactstrap";
import "./Account.css";

function Account() {

  const [data, setData] = useState([]);
  useEffect(() => {
    getCenter();

  }, []);

  const getCenter = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,
    })
    setData(response.data.center);
  }

  const columns = [
    { field: "center_id", headerName: "ID", width: 115 },
    { field: "center_name", headerName: "Trung tâm", width: 300 },
    { field: "province", headerName: "Địa chỉ", width: 115 },
    {
      field: "area",
      headerName: "Khu vực",
      width: 115,
    },
    {
      field: "action",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        console.log("pr", params.row.center_id);
        return (
          <div className='detailModal'>
            {params.row.account_status &&
              <NavLink to={"/manage/account/" + params.row.center_id} tag={Link}>
                <Button className="btn-round" color="info" type="button">
                  Cập nhật
                </Button>
              </NavLink>
            }
            {!params.row.account_status &&
              <NavLink>
                <Button className="btn-round" color="danger" type="button">
                  Cập nhật
                </Button>
              </NavLink>
            }
          </div >
        )
      }
    }
  ];


  return (
    <div className='centerList'>
      <div className='headerAccount'>
        <h2>
          Quản lý tài khoản
          <span>
            <Button className="btn-round createButton" color="info" type="button"
              to="/manage/create" tag={Link}
            >
              Cấp tài khoản
            </Button>
          </span>
        </h2>

      </div>
      <div style={{ height: 600, width: '100%' }} className='centerList'>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.center_id}
          slots={{ toolbar: GridToolbar }}
          sx={{ overflowX: 'scroll' }}
        />
      </div>
    </div>
  )
}

export default Account