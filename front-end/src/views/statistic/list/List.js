// import React, { useEffect, useState } from "react"
// import { Container } from '@mui/material';
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
// import axios from "axios";


// function List() {

//   const [keyword, setKeyWord] = useState('bach');

//   const handleKeyWord = (input) => {
//     setKeyWord(input);
//     console.log(keyword);
//   }

//   const [data, setData] = useState([]);
//   useEffect(() => {
//     getCarRegistrationNumber();
//   }, []);
//   const getCarRegistrationNumber = async () => {
//     let response = await axios({
//       method: 'post',
//       url: "http://localhost:3010/account/login",
//       data: {
//         username: 'admin',
//         password: 'abc123'
//       },
//     });
//     setData(response.data.owners);
//     console.log("check dataOwners", data);

//   }

//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };


//   const columns = [
//     { field: "owner_id", headerName: "ID", width: 115 },
//     { field: "owner_name", headerName: "Họ tên", width: 200 },
//     { field: "owner_address", headerName: "Địa chỉ", width: 350 },
//     {
//       field: "type_of_ownership",
//       headerName: "Status",
//       width: 120,
//     },
//     {
//       field: "contact_number",
//       headerName: "Số điện thoại",
//       width: 160,
//     },

//   ];

//   return (

//     <div>
//       <DataGrid
//         rows={data}
//         getRowId={(row) => row.owner_id}
//         columns={columns}
//         // pageSize={5}
//         // rowsPerPageOptions={[5]}

//         autoHeight
//       />
//     </div>
//   );
// }

// export default List

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from "react"



export default function List() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getCarRegistrationNumber();

  }, []);

  const getCarRegistrationNumber = async () => {
    let response0 = await axios({

      method: 'post',
      url: "http://localhost:3010/login",
      data: {
        username: 'admin',
        password: 'abc123'
      },
    });
    const token = response0.data.result;
    console.log("token here", response0);

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
    setData(response.data.owners);

    console.log("check dataOwners", data);

  }

  const columns = [
    { field: "owner_id", headerName: "ID", width: 115 },
    { field: "owner_name", headerName: "Họ tên", width: 200 },
    { field: "owner_address", headerName: "Địa chỉ", width: 350 },
    {
      field: "type_of_ownership",
      headerName: "Status",
      width: 100,
    },
    {
      field: "contact_number",
      headerName: "Số điện thoại",
      width: 120,
    },
    {
      field: "registration_number",
      headerName: "Mã đăng kiểm",
      width: 150,
    }
  ];
  return (

    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.registration_number}
        slots={{ toolbar: GridToolbar }}
        sx={{ overflowX: 'scroll' }}
      />
    </div>
  );
}
