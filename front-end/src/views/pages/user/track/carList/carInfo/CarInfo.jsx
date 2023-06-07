import { useParams, useNavigate, useAsyncError } from 'react-router-dom';
import { useEffect, useState, React } from 'react';
import axiosInstance from "functions/AxiosInstance";
import Cookies from "js-cookie";
import { Button, FormGroup, Input, Col, Form, Card, CardBody, CardTitle } from 'reactstrap';
import { formatDate, addMonthsToDate, isDateBeforeToday } from "functions/calculateDate";

function CarInfo() {
  const { carPlate } = useParams();
  const navigate = useNavigate();

  const [carData, setCarData] = useState([]);

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


  useEffect(() => {
    getCarInfo();
  }, []);

  const getCarInfo = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/carInfo/getByNumberPlate/${carPlate}`,
    })
    console.log("Plate", response.data);
    setCarData(response.data);

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

  const back = () => {
    navigate(-1);
  }



  return (
    <>

      <div className="form-row">
        <Card className="col-md-6">
          <div>
            <Button className="btn-round" color="info" type="button" onClick={back}>
              <i className="now-ui-icons arrows-1_minimal-left iconPos"></i>
              Back
            </Button>
          </div>
          <CardBody>
            <CardTitle className="my-form-title">Thông tin xe</CardTitle>
            <Form>
              <div className="form-row">
                <FormGroup className="col-md-4">
                  <label htmlFor="registration_number">Biển số xe</label>
                  <Input
                    className="form-control-plaintext"
                    readonly=""
                    id="registration_number"
                    placeholder={carPlate}
                    type="text">
                  </Input>
                </FormGroup>
                <FormGroup className="col-md-4">
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
                  <FormGroup className="col-md-4">
                    <label htmlFor="car_name">Hãng xe</label>
                    <Input
                      id="car_name"
                      placeholder={brand}
                      type="text"
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="brand">Dòng xe</label>
                    <Input
                      id="disabledTextInput"
                      placeholder={carName}
                      type="text"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="form-row">
                  <FormGroup className="col-md-5">
                    <label htmlFor="province">Nơi đăng ký</label>
                    <Input
                      id="province"
                      placeholder={province}
                      type="text"
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-4">
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
                  <FormGroup className="col-md-7">
                    <label htmlFor="last_date_expired">Ngày hết hạn đăng kiểm gần nhất</label>
                    <Input
                      id="last_date_expired"
                      placeholder={lastDateExpired}
                      type="text"
                    ></Input>
                  </FormGroup>
                  <FormGroup className="col-md-4">
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

        <Card className="col-md-6">
          <CardBody>
            <br /><br /><br />
            <CardTitle className="my-form-title">Chủ sở hữu</CardTitle>
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


    </>
  )
}

export default CarInfo;