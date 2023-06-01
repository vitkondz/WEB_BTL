import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from 'functions/AxiosInstance';
import {
  Button, Modal, ModalBody
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import "./CarList.css";

function CarList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataCar, setDataCar] = useState([]);
  const [dataOwner, setDataOwner] = useState([])
  const [modal1, setModal1] = React.useState(false);

  const [clickInfo, setClickInfo] = useState(null);
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
    setData(response.data);
    setDataCar(response.data.cars);
    console.log("check data", response.data);
  }

  const handleOnCellClick = (params) => {
    if (params.field === 'owner_name') {
      setClickInfo(params);
      setModal1(true);
      let owner = data.owners.find((owners) => owners.owner_id === params.row.owner_id);
      setDataOwner(owner);
      console.log("check id", dataOwner);
    }
  };

  const columns = [
    { field: "number_plate", headerName: "Biển xe", width: 115 },
    { field: "car_name", headerName: "Hãng xe", width: 130 },
    { field: "date_registered", headerName: "Ngày đăng ký", width: 115 },
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
    <div className='centerList'>
      <div>
        <h4>
          Danh sách xe theo dõi bởi {JSON.parse(Cookies.get('info')).center_name}
        </h4>
      </div>
      <div style={{ height: 600, width: '100%' }} className='centerList'>
        <DataGrid
          rows={dataCar}
          columns={columns}
          getRowId={(row) => row.number_plate}
          slots={{ toolbar: GridToolbar }}
          sx={{ overflowX: 'scroll' }}
          onCellClick={handleOnCellClick}
        />
      </div>


      <Modal isOpen={modal1} toggle={() => setModal1(false)} className="modal-lg">
        <div className="modal-header justify-content-center">
          <h4 className="title title-up">
            Thông tin chủ xe
          </h4>
        </div>
        <ModalBody>
          <div>
            <div className="infoLine">
              Chủ xe: <span className='data'>{dataOwner.owner_name}</span>
            </div>
            <div className="infoLine">
              Mã ID: <span className='data'>{dataOwner.owner_id} </span>
            </div>
            <div className="infoLine">
              Địa chỉ: <span className='data'>{dataOwner.owner_address}</span>
            </div>
            <div className="infoLine">
              Số điện thoại: <span className='data'>{dataOwner.contact_number}</span>
            </div>
            <div className="infoLine">
              Sở hữu: <span className='data'>{dataOwner.type_of_ownership}</span>
            </div>
            <div className="infoLine">
              Mã đăng ký xe: <span className='data'>{dataOwner.registration_number}</span>
            </div>
          </div>
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

export default CarList