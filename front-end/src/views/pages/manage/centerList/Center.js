import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from "react"
import { Button, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./Center.css";

function Center() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getCenter();

  }, []);

  const getCenter = async () => {
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
      width: 125,
      renderCell: (params) => {
        return (
          <div className='detail'>
            <NavLink to={"/manage/center/" + params.row.center_id} tag={Link}>
              <Button className="btn-round" color="info" type="button">
                Detail
            </Button>
            </NavLink>
          </div>
        )
      }
    }
  ];


  return (
    <div className='centerList'>
      <div>
        <h2>
          Trung tâm đăng kiểm toàn quốc
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

export default Center