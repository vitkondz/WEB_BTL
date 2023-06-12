import React from 'react';
import { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from "functions/AxiosInstance";
import getAreaByProvince from 'functions/getAreaByProvince';
import capitalize from 'functions/captalized';

function CreateAccount() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [centerName, setCenterName] = useState("")
  const [centerId, setCenterId] = useState("")
  const [province, setProvince] = useState("")
  const [area, setArea] = useState("")
  const [address, setAddress] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    getCenterId();
  }, [])
  const getCenterId = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,

    })
    let center_id = 'VN';
    for (let i = 1; i <= 4 - response.data.center.length.toString().length; i++) {
      center_id = center_id + '0'
    }
    center_id = center_id + response.data.center.length
    setCenterId(center_id);
    setAccount(center_id);
  }
  let checkPassword = () => {
    if (repeatPassword === password) {
      return true;
    } else {
      return false;
    }
  }
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Xử lý dữ liệu khi form được gửi đi
    console.log(centerName);
    if (checkPassword()) {
      await axiosInstance({
        headers: {
          "Content-Type": "application/json",
        },
        method: 'post',
        url: `http://localhost:3010/user/create`,
        data: {
          'account': account,
          'password': password,
          'email': email,
          'contact_number': phone,
          'center_name': 'Trung tâm đăng kiểm ' + centerName,
          'center_id': centerId,
          'province': province,
          'area': area,
          'address': address
        }
      }).then(() => {
        alert("Tạo user thành công")
        window.location.reload();
      })
    } else {
      alert("Mật khẩu nhập lại chưa đúng")
    }

  };
  const back = () => {
    navigate(-1);
  }
  return (
    <>
      <Card className='col-md-9'>
        <Button className="btn-round btnBack" color="info" type="button" onClick={back}>
          <i className="now-ui-icons arrows-1_minimal-left iconPos"></i>
          Back
        </Button>
        <CardBody>
          <CardTitle className="my-form-title">Tạo tài khoản trung tâm đăng kiểm</CardTitle>
          <Form onSubmit={handleSubmit}>
            <div className="form-row">
              <FormGroup className="col-md-6">
                <label htmlFor="account">Tên đăng nhập</label>
                <Input
                  id="account"
                  placeholder={account}
                  type="text"
                  onChange={(event) => { setAccount(event.target.value) }}
                  required
                  readOnly
                ></Input>
              </FormGroup>
              <FormGroup className="col-md-3">
                <label htmlFor="inputPassword4">Mật khẩu</label>
                <Input
                  id="inputPassword4"
                  placeholder={password}
                  type="password"
                  onChange={(event) => { setPassword(event.target.value) }}
                  required
                ></Input>
              </FormGroup>
              <FormGroup className="col-md-3">
                <label htmlFor="inputReenterPassword4">Nhập lại mật khẩu</label>
                <Input
                  id="inputReenterPassword4"
                  placeholder={repeatPassword}
                  type="password"
                  onChange={(event) => { setRepeatPassword(event.target.value) }}
                  required
                ></Input>
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className="col-md-7">
                <label htmlFor="inputEmail4">Email</label>
                <Input id="inputEmail4" placeholder={email} type="email" onChange={(event) => { setEmail(event.target.value) }} required
                ></Input>
              </FormGroup>
              <FormGroup className="col-md-5">
                <label htmlFor="contact_number">Số điện thoại</label>
                <Input id="contact_number" placeholder={phone} type="text" onChange={(event) => { setPhone(event.target.value) }} required
                ></Input>
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className='col-md-7'>
                <label htmlFor="center_name">Tên trung tâm</label>
                <Input
                  id="center_name"
                  placeholder={centerName}
                  onChange={async (event) => {
                    const capitalizedValue = await capitalize(event.target.value);
                    setCenterName(capitalizedValue);
                  }}
                  onBlur={async (event) => {
                    const capitalizedValue = await capitalize(event.target.value);
                    event.target.value = capitalizedValue;
                  }}
                  required
                ></Input>
              </FormGroup>
              <FormGroup className='col-md-5'>
                <label htmlFor="center_id">Mã trung tâm</label>
                <Input
                  readOnly
                  id="center_id"
                  placeholder={centerId}
                  type="text"
                  onChange={(event) => { setCenterId(event.target.value) }}
                  required
                ></Input>
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className='col-md-5'>
                <label htmlFor="province">Tỉnh thành</label>
                <Input id="inputState" type="select" onChange={async (event) => { setProvince(event.target.value); setArea(await getAreaByProvince(event.target.value)) }} required>
                  <option selected="">Chọn...</option>
                  {provinces.map((item, index) => (
                    <option key={`province-${index}`}>
                      {item.label}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <label htmlFor="area">Vùng miền</label>
                <Input
                  readOnly
                  id="area"
                  placeholder={area}
                  type="text"
                  required
                ></Input>
              </FormGroup>
            </div>
            <FormGroup>
              <label htmlFor="address">Địa chỉ</label>
              <Input
                id="address"
                placeholder={address}
                type="text"
                onChange={async (event) => {
                  const capitalizedValue = await capitalize(event.target.value);
                  setAddress(capitalizedValue);
                }}
                onBlur={async (event) => {
                  const capitalizedValue = await capitalize(event.target.value);
                  event.target.value = capitalizedValue;
                }}
                required
              ></Input>
            </FormGroup>
            <Button
              color="info"
              className="btn-round"
              type="submit"
            >
              Tạo
            </Button>
          </Form>
        </CardBody>
      </Card>

    </>
  );

}
const provinces = [
  { label: 'An Giang' },
  { label: 'Bà Rịa - Vũng Tàu' },
  { label: 'Bắc Giang' },
  { label: 'Bắc Kạn' },
  { label: 'Bạc Liêu' },
  { label: 'Bắc Ninh' },
  { label: 'Bến Tre' },
  { label: 'Bình Định' },
  { label: 'Bình Dương' },
  { label: 'Bình Phước' },
  { label: 'Bình Thuận' },
  { label: 'Cà Mau' },
  { label: 'Cần Thơ' },
  { label: 'Cao Bằng' },
  { label: 'Đà Nẵng' },
  { label: 'Đắk Lắk' },
  { label: 'Đắk Nông' },
  { label: 'Điện Biên' },
  { label: 'Đồng Nai' },
  { label: 'Đồng Tháp' },
  { label: 'Gia Lai' },
  { label: 'Hà Giang' },
  { label: 'Hà Nam' },
  { label: 'Hà Nội' },
  { label: 'Hà Tĩnh' },
  { label: 'Hải Dương' },
  { label: 'Hải Phòng' },
  { label: 'Hậu Giang' },
  { label: 'Hòa Bình' },
  { label: 'Hưng Yên' },
  { label: 'Khánh Hòa' },
  { label: 'Kiên Giang' },
  { label: 'Kon Tum' },
  { label: 'Lai Châu' },
  { label: 'Lâm Đồng' },
  { label: 'Lạng Sơn' },
  { label: 'Lào Cai' },
  { label: 'Long An' },
  { label: 'Nam Định' },
  { label: 'Nghệ An' },
  { label: 'Ninh Bình' },
  { label: 'Ninh Thuận' },
  { label: 'Phú Thọ' },
  { label: 'Phú Yên' },
  { label: 'Quảng Bình' },
  { label: 'Quảng Nam' },
  { label: 'Quảng Ngãi' },
  { label: 'Quảng Ninh' },
  { label: 'Quảng Trị' },
  { label: 'Sóc Trăng' },
  { label: 'Sơn La' },
  { label: 'Tây Ninh' },
  { label: 'Thái Bình' },
  { label: 'Thái Nguyên' },
  { label: 'Thanh Hóa' },
  { label: 'Thừa Thiên Huế' },
  { label: 'Tiền Giang' },
  { label: 'Trà Vinh' },
  { label: 'Tuyên Quang' },
  { label: 'Vĩnh Long' },
  { label: 'Vĩnh Phúc' },
  { label: 'Yên Bái' },
];

export default CreateAccount;