import * as React from 'react';
import './Filter.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import areaFilter from 'functions/areaFilter';
import axiosInstance from 'functions/AxiosInstance';
import Cookies from 'js-cookie';

export default function ForecastFilter(props) {
    const [province, setProvince] = useState([]);
    const [area, setArea] = useState([])
    const [center, setCenter] = useState([])

    useEffect(() => {
        getDataForFilter();
    }, [])
    const getDataForFilter = async () => {
        let response = await axiosInstance({
            headers: {
                "Content-Type": "application/json",
            },
            method: 'get',
            url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,

        })
        setArea((await areaFilter(response.data.center)).areas);
        setProvince((await areaFilter(response.data.center)).provinces);
        setCenter((await areaFilter(response.data.center)).centers);
    }

    return (
        <>
            <div className='filter'>
                <Autocomplete
                    onInputChange={(event, newInputValue) => {
                        props.setArea(newInputValue)

                    }}
                    disablePortal
                    id="combo-box-demo"
                    options={area}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Vùng miền" variant="standard" />}
                />
                <Autocomplete
                    onInputChange={(event, newInputValue) => {
                        props.setProvince(newInputValue);

                    }}
                    disablePortal
                    id="combo-box-demo"
                    options={province}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Tỉnh thành" variant="standard" />}
                />
                <Autocomplete
                    onInputChange={(event, newInputValue) => {
                        props.setCenter(newInputValue);

                    }}
                    disablePortal
                    id="combo-box-demo"
                    options={center}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Trung tâm" variant="standard" />}
                />
            </div>
        </>
    );
}