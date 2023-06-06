import { useEffect, useState, React } from 'react';
import Cookies from 'js-cookie'
import { useParams, useNavigate, useAsyncError } from 'react-router-dom';
import FixedNavbarUser from 'components/Navbars/FixedNavbarUser'
import { Button, FormGroup, Input, Col, Container, Card, CardBody, Row, CardText, CardTitle,CardLab, Label } from 'reactstrap';
import axiosInstance from "functions/AxiosInstance";


function InfoUser() {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    getCenterInfo();
  });

  const getCenterInfo = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,
    })
    let center = response.data.center;
    let data0 = center.find((center) => center.center_id === JSON.parse(Cookies.get('info')).center_id );

    setData(data0);
  }
  const back = () => {
    navigate(-1);
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
            <fieldset disabled>
              <FormGroup>
                  <Col sm="">
                    <Label className='lable badge badge-neutral'>Trung Tâm</Label>
                  </Col>
                  <Input
                    defaultValue=""
                    placeholder={JSON.parse(Cookies.get('info')).center_name}
                    type="text"
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
                  ></Input>
              </FormGroup>
              <FormGroup>
              <Col sm="">
                    <Label className='lable badge badge-neutral'>Tỉnh Thành</Label>
                  </Col>
                  <Input
                    defaultValue=""
                    placeholder={JSON.parse(Cookies.get('info')).province}
                    type="text"
                  ></Input>
                
              </FormGroup>
              <FormGroup>
              <Col sm="">
                    <Label className='lable badge badge-neutral'>Khu Vực</Label>
                  </Col>
                  <Input
                    defaultValue=""
                    placeholder={JSON.parse(Cookies.get('info')).area}
                    type="text"
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
                  ></Input>
                
              </FormGroup>
              <FormGroup>
              <Col sm="">
                    <Label className='lable badge badge-neutral'>Email</Label>
                  </Col>
                  <Input
                    defaultValue=""
                    placeholder={JSON.parse(Cookies.get('info')).email}
                    type="text"
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
                  ></Input>
                
              </FormGroup>
            </fieldset>
              <Button className="btn-round confirmBtn" color="info" type="button">
                <i className="now-ui-icons ui-1_check iconPos"></i>
                Xác nhận
              </Button>
            </div>
          }
          {showChangePw &&
            <div className="changeContainer">
              <CardTitle className="my-form-title">Đổi Mật Khẩu</CardTitle>
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
                    <CardText className='lable badge badge-neutral'>Mật Khẩu Cũ</CardText>
                  </Col>
                  <Input
                    defaultValue=""
                    placeholder="Enter old password"
                    type="password"
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
                  ></Input>
              </FormGroup>
              
               </fieldset>
              <Button className="btn-round confirmBtn" color="info" type="button">
                <i className="now-ui-icons ui-1_check iconPos"></i>
                Xác nhận
              </Button>
            </div>
          }
        </div>

      </div>



    </div>
    </div>
    </Container>
    
  )
}

export default InfoUser