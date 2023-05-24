import "./CenterInfo.css";
import { useParams, useNavigate, useAsyncError } from 'react-router-dom';
import { useEffect, useState, React } from 'react';
import axiosInstance from "functions/AxiosInstance";
import Cookies from "js-cookie";
import { Button, FormGroup, Input, Col } from 'reactstrap';

function CenterInfo() {
  const { centerId } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    getCenterInfo();
  }, [centerId]);

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
            </Button>
          </div>

        </div>
        <div className="rightUpdate">
          {showEdit &&
            <div className="editContainer">
              <p className="category">Chỉnh sửa thông tin trung tâm</p>
              <Col lg="6" sm="3">
                <div className="label">Mã trung tâm</div>
                <FormGroup>
                  <Input
                    defaultValue=""
                    placeholder={data.center_id}
                    type="text"
                  ></Input>
                </FormGroup>
              </Col>
              <Col lg="6" sm="3">
                <div className="label">Tỉnh thành</div>
                <FormGroup>
                  <Input
                    defaultValue=""
                    placeholder={data.province}
                    type="text"
                  ></Input>
                </FormGroup>
              </Col>
              <Col lg="6" sm="3">
                <div className="label">Khu vực</div>
                <FormGroup>
                  <Input
                    defaultValue=""
                    placeholder={data.area}
                    type="text"
                  ></Input>
                </FormGroup>
              </Col>
              <Button className="btn-round confirmBtn" color="info" type="button">
                <i className="now-ui-icons ui-1_check iconPos"></i>
                Xác nhận
              </Button>
            </div>
          }
          {showChangePw &&
            <div className="changeContainer">
              <p className="category">Đổi mật khẩu</p>
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
                  ></Input>
                </FormGroup>
              </Col>
              <Button className="btn-round confirmBtn" color="info" type="button">
                <i className="now-ui-icons ui-1_check iconPos"></i>
                Xác nhận
              </Button>
            </div>
          }
        </div>

      </div>



    </div>
  )
}

export default CenterInfo;