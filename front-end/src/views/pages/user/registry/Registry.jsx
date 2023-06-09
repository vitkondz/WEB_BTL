import React, { useEffect } from "react";
import FixedNavbarUser from "components/Navbars/FixedNavbarUser";
import './Registry.css'
import { useState } from "react";

import { PDFExport, savePDF } from '@progress/kendo-react-pdf'
import { useRef } from 'react'

import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
  InputGroup,
} from "reactstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';
import axiosInstance from "functions/AxiosInstance";
import getPlates from "functions/getPlates";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { formatDate, addMonthsToDate, isDateBeforeToday } from "functions/calculateDate";

function Registry() {
  const [listOfPlates, setListOfPlates] = useState([])

  const [numberPlate, setNumberPlate] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [carName, setCarName] = useState("")
  const [brand, setBrand] = useState("")
  const [province, setProvince] = useState("")
  const [dateRegistered, setDateRegistered] = useState("")
  const [purposeOfUse, setPurposeOfUse] = useState("")
  const [lastDateExpired, setLastDateExpired] = useState("")
  const [status, setStatus] = useState("")

  const [ownerName, setOwnerName] = useState("")
  const [typeOfOwnership, setTypeOfOwnership] = useState("")
  const [ownerId, setOwnerId] = useState("")
  const [ownerAddress, setOwnerAddress] = useState("")
  const [contactNumber, setContactNumber] = useState("")

  const [selectedDate, setSelectedDate] = useState(null);
  const [dateString, setDateString] = useState("")
  const [dateExpire, setDateExpire] = useState(null)
  const [registryCode, setRegistryCode] = useState("");
  const [time, setTime] = useState(6)

  const [isValidInput, setIsValidInput] = useState(true);
  const [modal1, setModal1] = React.useState(false);

  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }


  useEffect(() => {
    getRegistryCode();
    getListOfPlates();
  }, [])
  useEffect(() => {
    handleDisplay();
  }, [numberPlate])

  const getRegistryCode = async () => {
    let prefix = JSON.parse(Cookies.get('info')).center_id.slice(2, 6);
    await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,
    })
      .then((res) => {
        let surfix = res.data.registrations.length + 1;
        for (let i = 1; i <= 6 - surfix.toString().length; i++) {
          prefix = prefix + '0'
        }
        setRegistryCode(prefix + surfix);
      })
  }

  useEffect(() => {
    handleDateChange(selectedDate);

    // console.log("haha");
  }, [selectedDate, time])

  const handleDateChange = (date) => {
    console.log(addMonthsToDate(formatDate(date), time))
    setDateString(addMonthsToDate(formatDate(date), time))
    if (selectedDate !== null) {
      setDateExpire(addMonthsToDate(formatDate(selectedDate), time))
    }
    // console.log("sd", formatDate(selectedDate));
  };

  const getListOfPlates = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/numberPlate/getAll`,

    })
    setListOfPlates(response.data.result);
  }
  const handleDisplay = async () => {
    console.log(isValidInput);
    if (numberPlate && isValidInput) {
      let response = await axiosInstance({
        headers: {
          "Content-Type": "application/json",
        },
        method: 'get',
        url: `http://localhost:3010/carInfo/getByNumberPlate/${numberPlate}`,
      })
      setRegistrationNumber(response.data.car.registration_number)
      setCarName(response.data.car.car_name)
      setBrand(response.data.car.brand)
      setProvince(response.data.car.province)
      setDateRegistered(response.data.car.date_registered)
      setPurposeOfUse(response.data.car.purpose_of_use)
      setLastDateExpired(response.data.date_expired)
      isDateBeforeToday(response.data.date_expired) ?
        setStatus("Hết hạn")
        : setStatus("Chưa hết hạn")

      setOwnerName(response.data.owner.owner_name)
      setTypeOfOwnership(response.data.owner.type_of_ownership)
      setOwnerId(response.data.owner.owner_id)
      setOwnerAddress(response.data.owner.owner_address)
      setContactNumber(response.data.owner.contact_number)
    }
    else {
      setRegistrationNumber("")
      setCarName("")
      setBrand("")
      setProvince("")
      setDateRegistered("")
      setPurposeOfUse("")
      setLastDateExpired("")

      setOwnerName("")
      setTypeOfOwnership("")
      setOwnerId("")
      setOwnerAddress("")
      setContactNumber("")
    }
  }
  const handleSubmit = async (e) => {
    setModal1(true);
    e.preventDefault();

    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'post',
      url: `http://localhost:3010/registry/update`,
      data: {
        "registration_number": registrationNumber,
        "number_plate": numberPlate,
        "owner_name": ownerName,
        "owner_id": ownerId,
        "date_issued": formatDate(selectedDate),
        "date_expired": dateString,
        "center_name": JSON.parse(Cookies.get('info')).center_name,
        "center_id": JSON.parse(Cookies.get('info')).center_id,
        "registry_code": registryCode
      }
    })
      .then(() => {
      })
  }

  const checkValidInput = (newInputValue) => {
    var result = listOfPlates.find(function (element) {
      return element.number_plate === newInputValue;
    })
    return result;
  }

  return (
    <>
      <FixedNavbarUser />
      <div className="spaceHeader"></div>
      <div className="form-row">
        <Card className="col-md-7">
          <CardBody>
            <CardTitle className="my-form-title">Thông tin xe</CardTitle>
            <Form>
              <div className="form-row">
                <Autocomplete
                  onInputChange={(event, newInputValue) => {
                    // props.setYear(newInputValue);
                    setNumberPlate(newInputValue);
                    // setIsValidInput(listOfPlates.includes(newInputValue));
                    setIsValidInput(checkValidInput(newInputValue))
                  }}
                  disablePortal
                  id="combo-box-demo"
                  getOptionLabel={(option) => option.number_plate}
                  options={listOfPlates}
                  sx={{ width: 150 }}
                  renderInput={(params) => <TextField {...params} label="Nhập biển số xe" variant="standard" />}
                  error={!isValidInput}
                />
                <FormGroup className="col-md-3">
                  <label htmlFor="registration_number">Mã đăng ký xe</label>
                  <Input
                    readonly=""
                    id="registration_number"
                    placeholder={registrationNumber}
                    type="text">
                  </Input>
                </FormGroup>
              </div>
              <fieldset disabled>
                <div className="form-row">
                  <FormGroup className="col-md-5">
                    <label htmlFor="car_name">Hãng xe</label>
                    <Input
                      id="car_name"
                      placeholder={carName}
                      type="text"
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="brand">Dòng xe</label>
                    <Input
                      id="disabledTextInput"
                      placeholder={brand}
                      type="text"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="form-row">
                  <FormGroup className="col-md-7">
                    <label htmlFor="province">Nơi đăng ký</label>
                    <Input
                      id="province"
                      placeholder={province}
                      type="text"
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-3">
                    <label htmlFor="date_registered">Ngày đăng ký</label>
                    <Input
                      id="date_registered"
                      placeholder={dateRegistered}
                      type="text"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="form-row">
                  <FormGroup>
                    <label htmlFor="purpose_of_use">Mục đích sử dụng</label>
                    <Input
                      id="purpose_of_use"
                      placeholder={purposeOfUse}
                      type="text"
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-5">
                    <label htmlFor="last_date_expired">Ngày hết hạn đăng kiểm gần nhất</label>
                    <Input
                      id="last_date_expired"
                      placeholder={lastDateExpired}
                      type="text"
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-3">
                    <label htmlFor="status">Tình trạng đăng kiểm</label>
                    <Input
                      readOnly
                      id="status"
                      placeholder={status}
                      type="text"
                    ></Input>
                  </FormGroup>
                </div>
              </fieldset>
            </Form>
          </CardBody>
        </Card >

        <Card className="col-md-5">
          <CardBody>
            <CardTitle className="my-form-title">Thông tin chủ sở hữu</CardTitle>
            <fieldset disabled>
              <FormGroup>
                <label htmlFor="owner_name">Tên chủ sở hữu</label>
                <Input
                  id="owner_name"
                  placeholder={ownerName}
                  type="name"
                ></Input>
              </FormGroup>
              <FormGroup>
                <label htmlFor="type_of_ownership">Tổ chức / cá nhân</label>
                <Input
                  id="type_of_ownership"
                  placeholder={typeOfOwnership}
                  type="text"
                ></Input>
              </FormGroup>
              <FormGroup>
                <label htmlFor="owner_id">Căn cước công dân</label>
                <Input
                  id="owner_id"
                  placeholder={ownerId}
                  type="text"
                ></Input>
              </FormGroup>
              <FormGroup>
                <label htmlFor="owner_address">Khu vực thường trú</label>
                <Input
                  id="owner_address"
                  placeholder={ownerAddress}
                  type="text"
                ></Input>
              </FormGroup>
              <FormGroup>
                <label htmlFor="contact_number">Số điện thoại</label>
                <Input
                  id="contact_number"
                  placeholder={contactNumber}
                  type="text"
                ></Input>
              </FormGroup>
            </fieldset>
          </CardBody>
        </Card>
      </div >

      <Card>
        <CardBody>
          <CardTitle className="my-form-title">Đăng kiểm xe</CardTitle>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <FormGroup className="col-md-2">
                <label htmlFor="type_of_ownership">Ngày đăng kiểm</label>
                <InputGroup>
                  <DatePicker
                    selected={selectedDate}
                    // onChange={(event) => setSelectedDate(event.target.value)}
                    // onChange={handleDateChange}
                    onChange={
                      setSelectedDate
                      // setDateNewRegistry(selectedDate.getDate() + "/" + selectedDate.getMonth() + "/" + selectedDate.getFullYear())
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="dd/mm/yyyy"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <label htmlFor="time">Thời hạn</label>
                <Input id="time" type="select" onChange={(event) => setTime(parseInt(event.target.value.slice(0, 2)))}>
                  <option>6 tháng</option>
                  <option>12 tháng</option>
                  <option>24 tháng</option>
                </Input>
              </FormGroup>
              <FormGroup className="col-md-2">
                <label htmlFor="registry_code">Ngày hết hạn dự tính</label>
                <Input
                  readOnly
                  id=""
                  placeholder={dateExpire}
                  type="text"
                ></Input>
              </FormGroup>
              <FormGroup className="col-md-2">
                <label htmlFor="registry_code">Mã đăng kiểm</label>
                <Input
                  readOnly
                  id="registry_code"
                  placeholder={registryCode}
                  type="text"
                ></Input>
              </FormGroup>
            </div>
            <Button
              color="info"
              className="btn-round"
              type="submit">
              Upload
            </Button>
          </form>
        </CardBody>
      </Card >

      <Modal isOpen={modal1} toggle={() => setModal1(false)} className="modal-lg">
        <div className="modal-header justify-content-center">
          <h4 className="title title-up">
            ĐĂNG KIỂM THÀNH CÔNG
          </h4>
        </div>
        <ModalBody>
          <PDFExport ref={pdfExportComponent} paperSize="A4" >
            <h5 className="title justify-content-center">MINISTRY OF TRANSPORT</h5>
            <h4 className="title justify-content-center">REGISTRATION CERTIFICATE</h4>
            <div style={{ fontSize: "17px", paddingLeft: "100px" }}>REGISTRATION INFOMATION
              <div className="infoLine" style={{ fontSize: "15px" }}>
                Number plate: <span className='data'>{numberPlate}</span>
              </div>
              <div className="infoLine" style={{ fontSize: "15px" }}>
                Registration code: <span className='data'>{registrationNumber}</span>
              </div>
              <div className="infoLine" style={{ fontSize: "15px" }}>
                Car name: <span className='data'>{carName}</span>
              </div>
              <div className="infoLine" style={{ fontSize: "15px" }}>
                Brand: <span className='data'>{brand}</span>
              </div>
              <div className="infoLine" style={{ fontSize: "15px" }}>
                Province: <span className='data'>{province}</span>
              </div>
              <div className="infoLine" style={{ fontSize: "15px"}}>
                Owner ID: <span className='data'>{ownerId}</span>
              </div>
              <div className="infoLine" style={{ fontSize: "15px", fontWeight: "bold"}}>
                Registry date: <span className='data'>{formatDate(selectedDate)}</span>
              </div>
              <div className="infoLine" style={{ fontSize: "15px", fontWeight: "bold"}}>
                Expire date: <span className='data'>{dateExpire}</span>
              </div>
              
            </div>
            <div className="d-flex flex-column justify-content-end">
              <div className="d-flex justify-content-center font-weight-bold font-italic mt-5">Center Director</div> 
              <div className="d-flex justify-content-center">Signed</div>
            </div>
          </PDFExport>



        </ModalBody>
        <div className="modal-footer">
          <Button
            color="info"
            type="button"
            onClick={handleExportWithComponent}
          >
            Xuất giấy chứng nhận đăng kiểm
          </Button>
          <Button
            color="danger"
            type="button"
            onClick={() => {
              setModal1(false);
              window.location.reload() 
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  )
}
export default Registry;