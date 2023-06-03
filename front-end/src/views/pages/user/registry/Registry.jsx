import React, { useEffect } from "react";
import FixedNavbarUser from "components/Navbars/FixedNavbarUser";
import './Registry.css'
import { useState } from "react";

import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  ListGroup, ListGroupItem,
  InputGroup,
} from "reactstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';
import axiosInstance from "functions/AxiosInstance";
import getPlates from "functions/getPlates";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
  const [registryCode, setRegistryCode] = useState("");

  const [isValidInput, setIsValidInput] = useState(true);
  useEffect(() => {
    getRegistryCode();
    getListOfPlates();
  }, [])
  useEffect(() => {
    handleDisplay();
  },[numberPlate])

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
        let surfix = res.data.registrations.length;
        for (let i = 1; i <= 6 - surfix.toString().length; i++) {
          prefix = prefix + '0'
        }
        setRegistryCode(prefix + surfix);
      })
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getListOfPlates = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/VN0000`,

    })
    setListOfPlates(await getPlates(response.data.cars));
  }
  const handleDisplay = async () => {
    if (numberPlate && isValidInput) {
      let response = await axiosInstance({
        headers: {
          "Content-Type": "application/json",
        },
        method: 'get',
        url: `http://localhost:3010/carInfo/getByNumberPlate/${numberPlate}`,
      })
      console.log(response.data);
      setRegistrationNumber(response.data.car.registration_number)
      setCarName(response.data.car.car_name)
      setBrand(response.data.car.brand)
      setProvince(response.data.car.province)
      setDateRegistered(response.data.car.date_registered)
      setPurposeOfUse(response.data.car.purpose_of_use)
      setLastDateExpired(response.data.date_expired)

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
                    setIsValidInput(listOfPlates.includes(newInputValue));;
                  }}
                  disablePortal
                  id="combo-box-demo"
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
          <div className="form-row">
            <FormGroup className="col-md-2">
              <label htmlFor="type_of_ownership">Ngày đăng kiểm</label>
              <InputGroup>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="dd/mm/yyyy"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <label htmlFor="time">Thời hạn</label>
              <Input id="time" type="select">
                <option>12 tháng</option>
                <option>24 tháng</option>
              </Input>
            </FormGroup>
            <FormGroup className="col-md-1">
              <label htmlFor="registry_code">Mã đăng kiểm</label>
              <Input
                readOnly
                id="registry_code"
                placeholder={registryCode}
                type="text"
              ></Input>
            </FormGroup>
            {/* <FormGroup className="col-md-2">
              <label htmlFor="type_of_ownership">Ngày hết hạn</label>
              <Input
                readOnly
                id="type_of_ownership"
                placeholder=""
                type="text"
              ></Input>
            </FormGroup> */}
          </div>
          <Button
            color="info"
            className="btn-round"
            type="button">
            Upload
          </Button>
        </CardBody>
      </Card >
    </>
  )
}
export default Registry;