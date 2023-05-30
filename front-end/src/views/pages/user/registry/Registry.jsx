import React from "react";
import FixedNavbarUser from "components/Navbars/FixedNavbarUser";
import './Registry.css'
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Datetime from 'react-datetime';

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
function Registry() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
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
                {/* <Autocomplete
                  onInputChange={(event, newInputValue) => {
                    props.setYear(newInputValue);
                  }}
                  disablePortal
                  id="combo-box-demo"
                  options={year}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Năm" variant="standard" />}
                /> */}
                <FormGroup className="col-md-3">
                  <label htmlFor="registration_number">Mã đăng ký xe</label>
                  <Input
                    id="registration_number"
                    placeholder="Nhập vào đây 6 chữ số"
                    type="text">
                  </Input>
                </FormGroup>
                <FormGroup className="col-md-3">
                  <label htmlFor="number_plate">Biển số xe</label>
                  <Input
                    readonly=""
                    id="number_plate"
                    placeholder="Biển số xe"
                    type="text"
                  ></Input>
                </FormGroup>
              </div>
              <fieldset disabled>
                <div className="form-row">
                  <FormGroup className="col-md-5">
                    <label htmlFor="car_name">Hãng xe</label>
                    <Input
                      id="car_name"
                      placeholder="Hãng xe"
                      type="text"
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="brand">Dòng xe</label>
                    <Input
                      id="disabledTextInput"
                      placeholder="Dòng xe"
                      type="text"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="form-row">
                  <FormGroup className="col-md-7">
                    <label htmlFor="province">Nơi đăng ký</label>
                    <Input
                      id="province"
                      placeholder="Nơi đăng ký"
                      type="text"
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-3">
                    <label htmlFor="date_registered">Ngày đăng ký</label>
                    <Input
                      id="date_registered"
                      placeholder="Ngày đăng ký"
                      type="date"
                    ></Input>
                  </FormGroup>
                  </div>
                  <div className="form-row">
                  <FormGroup>
                    <label htmlFor="purpose_of_use">Mục đích sử dụng</label>
                    <Input
                      id="purpose_of_use"
                      placeholder="Mục đích sử dụng"
                      type="text"
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-5">
                    <label htmlFor="last date_expired">Ngày hết hạn đăng kiểm gần nhất (nếu có)</label>
                    <Input
                      id="last date_registered"
                      placeholder="Ngày hết hạn"
                      type="date"
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
                  placeholder="Tên chủ sở hữu"
                  type="name"
                ></Input>
              </FormGroup>
              <FormGroup>
                <label htmlFor="type_of_ownership">Tổ chức / cá nhân</label>
                <Input
                  id="type_of_ownership"
                  placeholder="Tổ chức / cá nhân"
                  type="text"
                ></Input>
              </FormGroup>
              <FormGroup>
                <label htmlFor="owner_id">Căn cước công dân</label>
                <Input
                  id="owner_id"
                  placeholder="Căn cước công dân"
                  type="text"
                ></Input>
              </FormGroup>
              <FormGroup>
                <label htmlFor="owner_address">Khu vực thường trú</label>
                <Input
                  id="owner_address"
                  placeholder="Khu vực thường trú"
                  type="text"
                ></Input>
              </FormGroup>
              <FormGroup>
                <label htmlFor="contact_number">Số điện thoại</label>
                <Input
                  id="contact_number"
                  placeholder="Số điện thoại"
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
                <option>3 tháng</option>
                <option>6 tháng</option>
              </Input>
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