import React, { useState } from 'react';
import csvtojson from 'csvtojson';
import './CSV.css';
import axiosInstance from 'functions/AxiosInstance';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { Button, Alert } from 'reactstrap';
function CSV() {
  const [data, setData] = useState([])
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const handleSubmit = () => {
    axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'post',
      url: 'http://localhost:3010/database/update',
      data: { registrations: data },
    })
      .then((res) => {
        console.log(res.data.result);
        setIsUploadSuccess(true);
        setTimeout(() => {
          setIsUploadSuccess(false);
        }, 3000);
      })
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
        setData(jsonData)
        // console.log(jsonData);
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
      <input type="file" onChange={handleFileUpload} />
      {/* <ProgressBar /> */}
      <Button
        color="info"
        className="btn-round"
        type="button"
        onClick={() => { handleSubmit() }}>
        Upload
      </Button>
      <div>
        {isUploadSuccess && (
          <Alert color="success">
            File uploaded successfully!
          </Alert>
        )}
      </div>
    </div>
  );
}

export default CSV;