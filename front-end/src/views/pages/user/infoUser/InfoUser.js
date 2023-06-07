import { useEffect, useState, React } from 'react';
import Cookies from 'js-cookie'
import { useParams, useNavigate, useAsyncError } from 'react-router-dom';
import FixedNavbarUser from 'components/Navbars/FixedNavbarUser'
import { Button, FormGroup, Input, Col, Container, Card, CardBody, Row, CardText, CardTitle, CardLab, Label, Form } from 'reactstrap';
import axiosInstance from "functions/AxiosInstance";
import { Navigate } from 'react-router-dom';
import getAreaByProvince from 'functions/getAreaByProvince';

function InfoUser() {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [centerName, setCenterName] = useState("")
  const [centerId, setCenterId] = useState("")
  const [province, setProvince] = useState("")
  const [area, setArea] = useState(JSON.parse(Cookies.get('info')).area)
  const [address, setAddress] = useState("")

  const [data, setData] = useState([]);
  const back = () => {
    navigate(-1);
  }
  let checkPassword = () => {
    if (repeatPassword === newPassword) {
      return true;
    } else {
      return false;
    }
  }
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (oldPassword && newPassword && checkPassword()) {
      let response = await axiosInstance({
        headers: {
          "Content-Type": "application/json",
        },
        method: 'put',
        url: `http://localhost:3010/account/passwordChange`,
        data: {
          "unit_id": JSON.parse(Cookies.get('info')).center_id,
          "oldPassword": oldPassword,
          "newPassword": newPassword
        }
      })
      if (!response.data.result) {
        alert("Mật khẩu cũ không đúng, vui lòng nhập lại")
      } else {
        alert("Đổi mật khẩu thành công")
        Cookies.remove('jwt');
        Cookies.remove('info');

        navigate('/login');
      }
    } else {
      alert("Mật khẩu nhập lại không đúng")
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'put',
      url: `http://localhost:3010/user/update`,
      data: {
        'email': email,
        'contact_number': phone,
        'center_name': 'Trung tâm đăng kiểm ' + centerName,
        'center_id': centerId,
        'province': province,
        'area': area,
        'address': address
      }
    }).then(() => {
      alert("Thay đổi trung tâm thành công")
      Cookies.remove('jwt');
      Cookies.remove('info');

      navigate('/login');
    })

  }
  return (
    <Container className="py-5 cre">
      <div>
        <FixedNavbarUser />
        <div className='centerInfo'>
          <div className="headerCenterInfo">
            <h2 className="headerCenterName">
              {JSON.parse(Cookies.get('info')).center_name}
            </h2>
          </div>
          <div className="bodyCenterInfo">
            <div className="leftInfo">

              <CardBody>
                <CardTitle className="my-form-title">Thông tin Trung Tâm</CardTitle>
                <fieldset disabled>
                  <FormGroup>
                    <Col sm="">
                      <Label className='lable badge badge-neutral'>Trung Tâm</Label>
                    </Col>
                    <Col sm="">
                      <CardText className="text-muted">{JSON.parse(Cookies.get('info')).center_name}</CardText>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col sm="">
                      <CardText className='lable badge badge-neutral'>Mã Trung Tâm</CardText>
                    </Col>
                    <Col sm="">
                      <CardText className="text-muted">{JSON.parse(Cookies.get('info')).center_id}</CardText>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col sm="">
                      <Label className='lable badge badge-neutral'>Tỉnh Thành</Label>
                    </Col>
                    <Col sm="">
                      <CardText className="text-muted">{JSON.parse(Cookies.get('info')).province}</CardText>
                    </Col>

                  </FormGroup>
                  <FormGroup>
                    <Col sm="">
                      <Label className='lable badge badge-neutral'>Khu Vực</Label>
                    </Col>
                    <Col sm="">
                      <CardText className="text-muted">{JSON.parse(Cookies.get('info')).area}</CardText>
                    </Col>

                  </FormGroup>
                  <FormGroup>
                    <Col sm="">
                      <Label className='lable badge badge-neutral'>Địa chỉ</Label>
                    </Col>
                    <Col sm="">
                      <CardText className="text-muted">{JSON.parse(Cookies.get('info')).address}</CardText>
                    </Col>

                  </FormGroup>
                  <FormGroup>
                    <Col sm="">
                      <Label className='lable badge badge-neutral'>Email</Label>
                    </Col>
                    <Col sm="">
                      <CardText className="text-muted">{JSON.parse(Cookies.get('info')).email}</CardText>
                    </Col>

                  </FormGroup>
                  <FormGroup>
                    <Col sm="">
                      <Label className='lable badge badge-neutral'>Liên hệ</Label>
                    </Col>
                    <Col sm="">
                      <CardText className="text-muted">{JSON.parse(Cookies.get('info')).contact_number}</CardText>
                    </Col>

                  </FormGroup>
                </fieldset>
              </CardBody>

              <div className="basicButton">
                <Button
                  className="btn-round"
                  color="info"
                  type="button"
                  onClick={() => {
                    setShowEdit(!showEdit);
                    setShowChangePw(false);
                  }}
                >
                  <i className="now-ui-icons travel_info iconPos"></i>
                  Sửa thông tin
                </Button>
                <Button
                  className="btn-round"
                  color="info"
                  type="button"
                  onClick={() => {
                    setShowChangePw(!showChangePw);
                    setShowEdit(false);
                  }}
                >
                  <i className="now-ui-icons objects_key-25 iconPos"></i>
                  Đổi mật khẩu
                </Button>
                <br />
              </div>
            </div>
            <div className="rightUpdate">
              {showEdit &&
                <div className="editContainer">
                  <CardTitle className="my-form-title">Chỉnh sửa thông tin</CardTitle>
                  <Form onSubmit={handleEdit}>
                    <FormGroup>
                      <Col sm="">
                        <Label className='lable badge badge-neutral'>Trung Tâm</Label>
                      </Col>
                      <Input
                        defaultValue=""
                        placeholder={JSON.parse(Cookies.get('info')).center_name}
                        type="text"
                        onChange={(event) => { setCenterName(event.target.value) }}
                        required
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Col sm="">
                        <CardText className='lable badge badge-neutral'>Mã Trung Tâm</CardText>
                      </Col>
                      <Input
                        defaultValue=""
                        placeholder={JSON.parse(Cookies.get('info')).center_id}
                        type="text"
                        onChange={(event) => { setCenterId(event.target.value) }}
                        required
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Col sm="">
                        <Label className='lable badge badge-neutral'>Tỉnh Thành</Label>
                      </Col>
                      <Input id="inputState" type="select" onChange={async (event) => { setProvince(event.target.value); setArea(await getAreaByProvince(event.target.value)) }} required>
                        <option selected="">{JSON.parse(Cookies.get('info')).province}</option>
                        {provinces.map((item, index) => (
                          <option key={`province-${index}`}>
                            {item.label}
                          </option>
                        ))}
                      </Input>

                    </FormGroup>
                    <FormGroup>
                      <Col sm="">
                        <Label className='lable badge badge-neutral'>Khu Vực</Label>
                      </Col>
                      <Input
                        defaultValue=""
                        placeholder={area}
                        type="text"
                        readOnly
                        required
                      ></Input>

                    </FormGroup>
                    <FormGroup>
                      <Col sm="">
                        <Label className='lable badge badge-neutral'>Địa chỉ</Label>
                      </Col>
                      <Input
                        defaultValue=""
                        placeholder={JSON.parse(Cookies.get('info')).address}
                        type="text"
                        onChange={(event) => { setAddress(event.target.value) }}
                        required
                      ></Input>

                    </FormGroup>
                    <FormGroup>
                      <Col sm="">
                        <Label className='lable badge badge-neutral'>Email</Label>
                      </Col>
                      <Input
                        defaultValue=""
                        placeholder={JSON.parse(Cookies.get('info')).email}
                        type="email"
                        onChange={(event) => { setEmail(event.target.value) }}
                        required
                      ></Input>

                    </FormGroup>
                    <FormGroup>
                      <Col sm="">
                        <Label className='lable badge badge-neutral'>Liên hệ</Label>
                      </Col>
                      <Input
                        defaultValue=""
                        placeholder={JSON.parse(Cookies.get('info')).contact_number}
                        type="text"
                        onChange={(event) => { setPhone(event.target.value) }}
                        required
                      ></Input>

                    </FormGroup>
                    <Button className="btn-round confirmBtn" color="info" type="submit">
                      <i className="now-ui-icons ui-1_check iconPos"></i>
                      Xác nhận
                    </Button>
                  </Form>
                </div>
              }
              {showChangePw &&
                <div className="changeContainer">
                  <CardTitle className="my-form-title">Đổi Mật Khẩu</CardTitle>
                  <Form onSubmit={handleChangePassword}>
                    <FormGroup>
                      <Col sm="">
                        <Label className='lable badge badge-neutral'>Trung Tâm</Label>
                      </Col>
                      <Col sm="">
                        <CardText className="text-muted">{JSON.parse(Cookies.get('info')).center_name}</CardText>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col sm="">
                        <CardText className='lable badge badge-neutral'>Mã Trung Tâm</CardText>
                      </Col>
                      <Col sm="">
                        <CardText className="text-muted">{JSON.parse(Cookies.get('info')).center_id}</CardText>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col sm="">
                        <CardText className='lable badge badge-neutral'>Mật Khẩu Cũ</CardText>
                      </Col>
                      <Input
                        defaultValue=""
                        placeholder="Enter old password"
                        type="password"
                        onChange={(event) => setOldPassword(event.target.value)}
                        required
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Col sm="">
                        <CardText className='lable badge badge-neutral'>Mật Khẩu Mới</CardText>
                      </Col>
                      <Input
                        defaultValue=""
                        placeholder="Enter new password"
                        type="password"
                        onChange={(event) => setNewPassword(event.target.value)}
                        required
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Col sm="">
                        <CardText className='lable badge badge-neutral'>Nhập Lại Mật Khẩu Mới</CardText>
                      </Col>
                      <Input
                        defaultValue=""
                        placeholder="Re-enter new password"
                        type="password"
                        onChange={(event) => setRepeatPassword(event.target.value)}
                        required
                      ></Input>
                    </FormGroup>

                    <Button className="btn-round confirmBtn" color="info" type="submit">
                      <i className="now-ui-icons ui-1_check iconPos"></i>
                      Xác nhận
                    </Button>
                  </Form>
                </div>
              }
            </div>

          </div>



        </div>
      </div>
    </Container>

  )
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

export default InfoUser