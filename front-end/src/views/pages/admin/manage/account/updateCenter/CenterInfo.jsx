import "./CenterInfo.css";
import { useParams, useNavigate, useAsyncError } from 'react-router-dom';
import { useEffect, useState, React } from 'react';
import axiosInstance from "functions/AxiosInstance";
import Cookies from "js-cookie";
import { Button, FormGroup, Input, Col, Form } from 'reactstrap';
import getAreaByProvince from 'functions/getAreaByProvince';

function CenterInfo() {
  const { centerId } = useParams();

  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [centerName, setCenterName] = useState("")
  const [centerID, setCenterID] = useState("")
  const [province, setProvince] = useState("")
  const [address, setAddress] = useState("")
  
  useEffect(() => {
    getCenterInfo();
  }, [centerId]);
  const [area, setArea] = useState(data);
  const getCenterInfo = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,
    })
    let center = response.data.center;
    let data0 = center.find((center) => center.center_id === centerId);

    setData(data0);
  }

  

  console.log("checkdata", data);

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
          "unit_id": data.center_id,
          "oldPassword": oldPassword,
          "newPassword": newPassword
        }
      })
      if (!response.data.result) {
        alert("Mật khẩu cũ không đúng, vui lòng nhập lại")
      } else {
        alert("Đổi mật khẩu thành công")
        navigate(-1);
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
        'center_id': centerID,
        'province': province,
        'area': area,
        'address': address
      }
    }).then(() => {
      alert("Thay đổi trung tâm thành công")
      navigate(-1);
    })

  }

  const handleDelete = async (e) => {
    alert("Xóa tài khoản trung tâm?");
    await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'delete',
      url: `http://localhost:3010/user/account/delete/${data.center_id}`,
    }).then(() => {
      alert("Xóa tài khoản thành công");
      navigate(-1);
    })
    // console.log("delete", response)
  }


  return (
    <div className='centerInfo'>
      <div className="headerCenterInfo">
        <Button className="btn-round btnBack" color="info" type="button" onClick={back}>
          <i className="now-ui-icons arrows-1_minimal-left iconPos"></i>
          Back
        </Button>
        <h2 className="headerCenterName">
          {data.center_name}
        </h2>
      </div>
      <div className="bodyCenterInfo">
        <div className="leftInfo">
          <div className="basicInfo">
            <div className="infoLine">
              <div>Mã trung tâm: <span className="data">{data.center_id}</span></div>
            </div>
            <div className="infoLine">
              <div>Tỉnh thành: <span className="data">{data.province}</span></div>
            </div>
            <div className="infoLine">
              <div>Khu vực: <span className="data">{data.area}</span></div>
            </div>
            <div className="infoLine">
              <div>Số điện thoại: <span className="data">{data.contact_number}</span></div>
            </div>
            <div className="infoLine">
              <div>Email: <span className="data">{data.email}</span></div>
            </div>
            <div className="infoLine">
              <div>Địa chỉ: <span className="data">{data.address}</span></div>
            </div>
          </div>
          <div className="basicButton">
            <Button className="btn-round" color="info" type="button"
              onClick={() => { setShowEdit(!showEdit); setShowChangePw(false) }}
            >
              <i className="now-ui-icons travel_info iconPos"></i>
              Sửa thông tin
            </Button>
            <Button className="btn-round" color="info" type="button"
              onClick={() => { setShowChangePw(!showChangePw); setShowEdit(false) }}
            >
              <i className="now-ui-icons objects_key-25 iconPos"></i>
              Đổi mật khẩu
            </Button><br />
            <Button className="btn-round" color="primary" type="button"
              onClick={() => handleDelete()}
            >
              <i className="now-ui-icons objects_key-25 iconPos"></i>
              Xóa tài khoản
            </Button>
          </div>

        </div>
        <div className="rightUpdate">
          {showEdit &&
            <div className="editContainer">
              <p className="category">Chỉnh sửa thông tin trung tâm</p>
              <Form onSubmit={handleEdit}>
                <Col lg="6" sm="3">
                  <div className="label">Tên trung tâm</div>
                  <FormGroup>
                    <Input
                      required
                      defaultValue={data.center_name}
                      type="text"
                      onChange={(event) => { setCenterName(event.target.value) }}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="6" sm="3">
                  <div className="label">Mã trung tâm</div>
                  <FormGroup>
                    <Input
                      required
                      defaultValue={data.center_id}
                      type="text"
                      onChange={(event) => { setCenterID(event.target.value) }}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="6" sm="3">
                  <div className="label">Tỉnh thành</div>
                  <FormGroup>
                    <Input id="inputState" type="select" onChange={async (event) => { setProvince(event.target.value); setArea(await getAreaByProvince(event.target.value)) }} required>
                      <option selected="">{data.province}</option>
                      {provinces.map((item, index) => (
                        <option key={`province-${index}`}>
                          {item.label}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="6" sm="3">
                  <div className="label">Khu vực</div>
                  <FormGroup>
                    <Input
                      required
                      readOnly
                      defaultValue={area}
                      type="text"
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="6" sm="3">
                  <div className="label">Số điện thoại</div>
                  <FormGroup>
                    <Input
                      required
                      defaultValue={data.contact_number}
                      type="text"
                      onChange={(event) => { setPhone(event.target.value) }}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="6" sm="3">
                  <div className="label">Email</div>
                  <FormGroup>
                    <Input
                      required
                      defaultValue={data.email}
                      type="email"
                      onChange={(event) => { setEmail(event.target.value) }}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="6" sm="3">
                  <div className="label">Địa chỉ</div>
                  <FormGroup>
                    <Input
                      required
                      defaultValue={data.address}
                      type="text"
                      onChange={(event) => { setAddress(event.target.value) }}
                    ></Input>
                  </FormGroup>
                </Col>
                <Button className="btn-round confirmBtn" color="info" type="submit"
                >
                  <i className="now-ui-icons ui-1_check iconPos"></i>
                  Xác nhận
                </Button>
              </Form>
            </div>
          }
          {showChangePw &&
            <div className="changeContainer">
              <p className="category">Đổi mật khẩu</p>
              <Form onSubmit={handleChangePassword}>
                <Col lg="6" sm="3">
                  <div className="label">Mã trung tâm</div>
                  <FormGroup>
                    <Input
                      placeholder={data.center_id}
                      readonly=""
                      type="text"
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="6" sm="3">
                  <div className="label">Mật khẩu cũ</div>
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="Enter old password"
                      type="password"
                      onChange={(event) => setOldPassword(event.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="6" sm="3">
                  <div className="label">Mật khẩu mới</div>
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="Enter new password"
                      type="password"
                      onChange={(event) => setNewPassword(event.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="6" sm="3">
                  <div className="label">Nhập mật khẩu mới</div>
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="Re-enter new password"
                      type="password"
                      onChange={(event) => setRepeatPassword(event.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
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

export default CenterInfo;