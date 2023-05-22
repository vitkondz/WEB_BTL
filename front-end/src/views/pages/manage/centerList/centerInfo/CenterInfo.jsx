import "./CenterInfo.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, React } from 'react';
import axiosInstance from "functions/AxiosInstance";
import Cookies from "js-cookie";
import { Button} from 'reactstrap';

function CenterInfo() {
  const { centerId } = useParams();
  const navigate = useNavigate();
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