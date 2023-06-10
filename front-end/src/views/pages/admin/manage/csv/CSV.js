import React, { useState } from 'react';
import csvtojson from 'csvtojson';
import './CSV.css';
import axiosInstance from 'functions/AxiosInstance';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { Button, Alert, Progress } from 'reactstrap';
function CSV() {
  const [data, setData] = useState([])
  let processingData = [];
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [progressValue, setProgressValue] = useState(0); // Giá trị mặc định là 60
  const [progressBar, setProgressBar] = useState(false)

  // Hàm xử lý thay đổi giá trị của ProgressBar
  const handleChangeValue = (event) => {
    const newValue = parseInt(event.target.value);
    setProgressValue(newValue);
  };

  const handleSubmit = async () => {
    for (let i = 0; i < processingData.length - processingData.length / 10 + 1; i = i + processingData.length / 10) {
      let tmp = [];
      for (let j = i; j < i + processingData.length / 10; j++) {
        tmp.push(processingData[j])
      }
      console.log("registrations:", tmp);

      await axiosInstance({
        headers: {
          "Content-Type": "application/json",
        },
        method: 'post',
        url: 'http://localhost:3010/database/update',
        data: { registrations: tmp },
      })
        .then((res) => {
          console.log(res.data.result);
          setProgressValue((prevValue) => prevValue + 10)
          // setIsUploadSuccess(true);
          // setTimeout(() => {
          //   setIsUploadSuccess(false);
          // }, 3000);
        })
      tmp = [];
    }
    setProgressBar(false);
    alert("Thành công")
    window.location.reload();
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        const csvData = e.target.result;

        // Convert CSV to JSON
        const jsonData = await csvtojson().fromString(csvData);

        // Use the JSON data as needed
        processingData = jsonData
        console.log(processingData);
        // axiosInstance({
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   method: 'post',
        //   url: 'http://localhost:3010/database/update',
        //   data: data,
        // })
        //   .then((res) => {
        //     console.log(res.data.result);
        //   })
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <div>
      <h3>Upload file danh sách các ô tô đã qua đăng ký</h3>
      <h4>Định dạng file: .csv</h4>
      <input type="file" onChange={handleFileUpload} accept=".csv" />
      {/* <ProgressBar /> */}
      <Button
        color="info"
        className="btn-round"
        type="button"
        onClick={() => { handleSubmit(); setProgressBar(true) }}>
        Upload
      </Button>
      {/* <div>
        {isUploadSuccess && (
          <Alert color="success">
            File uploaded successfully!
          </Alert>
        )}
      </div> */}
      {progressBar &&
        <div className="progress-container progress-success">
          <span className="progress-badge">Đang tải lên</span>
          <Progress max="100" value={progressValue}>
            <span className="progress-value">{progressValue}%</span>
          </Progress>
        </div>}
    </div>
  );
}

export default CSV;