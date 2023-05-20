import "./CenterInfo.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { Button} from 'reactstrap';

function CenterInfo() {
  const { centerId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    getCenterInfo();
  }, [centerId]);

  const getCenterInfo = async () => {
    let response0 = await axios({
      method: 'post',
      url: "http://localhost:3010/login",
      data: {
        username: 'admin',
        password: 'abc123'
      },
    });
    const token = response0.data.result;

    let response = await axios({
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      method: 'post',
      url: "http://localhost:3010/account/login",
      data: {
        username: 'admin',
        password: 'abc123'
      },
    });
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
      <Button className="btn-round" color="info" type="button" onClick={back}>
        <i className="now-ui-icons arrows-1_minimal-left icon_back"></i>
        Back
      </Button>

      <h2>
        {data.center_name}
      </h2>
      <div>Mã trung tâm: {data.center_id}</div>
      <div>Tỉnh thành: {data.province}</div>
      <div>Khu vực: {data.area}</div>

    </div>
  )
}

export default CenterInfo;