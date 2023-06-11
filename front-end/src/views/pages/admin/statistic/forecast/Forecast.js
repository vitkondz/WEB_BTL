import React from 'react'
import axiosInstance from 'functions/AxiosInstance';
import { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import nearlyExpiredFilter from 'functions/nearlyExpiredFilter';
import BieChart from 'components/chart/PieChart';
import ForecastFilter from 'components/filter/ForecastFilter';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Button, Modal, ModalBody
} from "reactstrap";

const Forecast = () => {
  const [data, setData] = useState([]);
  const [dataRegistration, setDataRegistration] = useState([]);

  const [area, setArea] = useState(false)
  const [province, setProvince] = useState(false)
  const [center, setCenter] = useState(false)

  const [dataForPie, setDataForPie] = useState([])

  const [widthValue, setWidthValue] = useState([]);

  const [dataOwner, setDataOwner] = useState([])
  const [modal1, setModal1] = React.useState(false);
  const [dataCar, setDataCar] = useState([])
  const [modal2, setModal2] = React.useState(false);

  useEffect(() => {
    getForecast();
    getNearlyExpired();
  }, [area, province, center]);

  useEffect(() => {
    setWidthValue(window.innerWidth > 500 ? '80vw' : '100vw');
    console.log('width', widthValue);
  }, [window.innerWidth]);

  const getNearlyExpired = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,
    })
    setDataRegistration(await nearlyExpiredFilter(response.data.registrations));
    setData(response.data);
    // console.log("exp", await nearlyExpiredFilter(response.data.registrations));
    console.log("data", response.data);
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

  const columns = [
    { field: "number_plate", headerName: "Biển xe", width: 130 },
    { field: "registration_number", headerName: "Mã đăng ký xe", width: 130, headerAlign: 'center' },
    { field: "date_issued", headerName: "Ngày đăng kiểm", width: 130 },
    { field: "date_expired", headerName: "Ngày hết hạn", width: 130 },
    { field: "owner_name", headerName: "Chủ xe", width: 315, headerAlign: 'center' }
  ];

  const handleOnCellClick = (params) => {
    if (params.field === 'owner_name') {
      setModal1(true);
      let owner = data.owners.find((owners) => owners.owner_id === params.row.owner_id);
      setDataOwner(owner);
      console.log("check id", data);
    }

    if (params.field === 'number_plate' || params.field === 'registration_number') {
      setModal2(true);
      let car = data.cars.find((cars) => cars.number_plate === params.row.number_plate);
      setDataCar(car);
      console.log("check id", dataCar);
    }
  };

  return (
    <div>
      <h3>Dự báo lượng xe đăng kiểm mới và đăng kiểm lại trong tháng tới</h3>
      <ForecastFilter
        setArea={setArea}
        setProvince={setProvince}
        setCenter={setCenter}
      />
      {/* <div>Check Area: {area}</div>
      <div>Check Province: {province}</div>
      <div>Check Center: {center}</div> */}
      <BieChart dataForPie={dataForPie} />


      <h3>Danh sách xe sắp hết hạn đăng kiểm</h3>
      <div style={{height: 600, width: widthValue}} className='centerList'>
        <DataGrid
          rows={dataRegistration}
          columns={columns}
          getRowId={(row) => row.registration_number}
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

      <Modal isOpen={modal2} toggle={() => setModal2(false)} className="modal-lg">
        <div className="modal-header justify-content-center">
          <h4 className="title title-up">
            Thông tin xe
          </h4>
        </div>
        <ModalBody>
          <div>
            <div className="infoLine">
              Biển số xe: <span className='data'>{dataCar.number_plate}</span>
            </div>
            <div className="infoLine">
              Dòng xe: <span className='data'>{dataCar.brand} </span>
            </div>
            <div className="infoLine">
              Hãng xe: <span className='data'>{dataCar.car_name}</span>
            </div>
            <div className="infoLine">
              Đăng ký: <span className='data'>{dataCar.date_registered}</span>
            </div>
            <div className="infoLine">
              Mã đăng ký: <span className='data'>{dataCar.registration_number}</span>
            </div>
            <div className="infoLine">
              Chủ xe: <span className='data'>{dataCar.owner_name}</span>
            </div>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <span></span>
          <Button
            color="danger"
            type="button"
            onClick={() => setModal2(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Forecast