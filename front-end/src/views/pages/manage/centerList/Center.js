import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from 'functions/AxiosInstance';
import {
  Button,
  Modal,
  ModalBody,
  NavLink
} from "reactstrap";
import "./Center.css";

function Center() {
  const [modal1, setModal1] = React.useState(false);

  const [data, setData] = useState([]);
  const [dataCenter, setDataCenter] = useState([]);
  const [dataTotal, setDataTotal] = useState([]);
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
    setDataTotal(response.data.center);
  }

  const updateDataCenter = (centerId) => {
    let data0 = dataTotal.find((center) => center.center_id === centerId);
    setDataCenter(data0);
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
          <div className='detailModal'>
            <Button
              color="info"
              className="btn-round"
              type="button"
              onClick={() => {
                updateDataCenter(params.row.center_id);
                setModal1(true);
              }}
            >
              Detail
            </Button>
            <Modal isOpen={modal1} toggle={() => setModal1(false)}>
              <div className="modal-header justify-content-center">
                <h4 className="title title-up">{dataCenter.center_name}</h4>
              </div>
              <ModalBody>
                <p>
                  <div><b>Mã trung tâm: {dataCenter.center_id}</b></div>
                  <div><b>Tỉnh thành: {dataCenter.province}</b> </div>
                  <div><b>Khu vực: {dataCenter.area}</b> </div>
                </p>
              </ModalBody>
              <div className="modal-footer">
                <span></span>
                <Button
                  color="danger"
                  type="button"
                  onClick={() => setModal1(false)}
                >
                  Close
                </Button>
              </div>
            </Modal>
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