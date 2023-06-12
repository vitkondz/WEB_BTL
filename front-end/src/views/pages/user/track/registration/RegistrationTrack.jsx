import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from 'functions/AxiosInstance';
import {
  Button, Modal, ModalBody
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import DetailFilterForUser from 'components/filter/DetailFilterForUser';
import timeListFilter from 'functions/timeListFilter';

function RegistrationTrack() {
  const [data, setData] = useState([]);
  const [dataRes, setDataRes] = useState([]);
  const [dataOwner, setDataOwner] = useState([]);
  const [modal1, setModal1] = React.useState(false);

  const [year, setYear] = useState(false)
  const [quarter, setQuarter] = useState(false)
  const [month, setMonth] = useState(false)

  const [area, setArea] = useState(false)
  const [province, setProvince] = useState(false)
  const [center, setCenter] = useState(false)

  const navigate = useNavigate();
  useEffect(() => {
    getRegistration();
  }, [year, quarter, month]);

  const getRegistration = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,
    })
    setData(response.data);
    setDataRes(await timeListFilter(response.data.registrations, response.data.center, year, quarter, month, center, province, area));
    console.log("check data", response.data.registrations);
  }

  const handleOnCellClick = (params) => {
    if (params.field === 'owner_name') {
      setModal1(true);
      let owner = data.owners.find((owners) => owners.registration_number === params.row.registration_number);
      setDataOwner(owner);
      console.log("check id", dataOwner);
    }
    if (params.field === 'number_plate') {
      navigate(`/track/carlist/${params.row.number_plate}`);
    }
  };

  const columns = [
    { field: "registry_code", headerName: "Mã đăng kiểm", width: 130, cursor: 'pointer' },
    { field: "number_plate", headerName: "Biển xe", width: 130 },
    { field: "date_issued", headerName: "Ngày đăng kiểm", width: 150 },
    { field: "date_expired", headerName: "Ngày hết hạn", width: 130 },
    { field: "owner_name", headerName: "Chủ xe", width: 350, headerAlign: 'center' },
  ];


  return (
    <div className='centerList'>
      <div>
        <h4>
          Thống kê đăng kiểm bởi {JSON.parse(Cookies.get('info')).center_name}
        </h4>
        <DetailFilterForUser
          setYear={setYear}
          setMonth={setMonth}
          setQuarter={setQuarter}
        />
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={dataRes}
          columns={columns}
          getRowId={(row) => row.registry_code}
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

export default RegistrationTrack