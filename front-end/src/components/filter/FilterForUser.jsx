import * as React from 'react';
import './Filter.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

export default function FilterForUser(props) {

    return (
        <div className='filter'>
            
            
            <Autocomplete
                onInputChange={(event, newInputValue) => {
                    props.setYear(+newInputValue);
                    
                }}
                disablePortal
                id="combo-box-demo"
                options={year}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Năm" variant="standard" />}
            />
            

        </div>
    );
}

const year = [
    {label: 2020},
    {label: 2021},
    {label: 2022},
    {label: 2023},
]

const province = [
    {label: 'Bắc Giang'},
    {label: 'Bình Thuận'},
    {label: 'Bình Phước'},
    {label: 'Quảng Bình'},
    {label: 'Kiên Giang'},
    {label: 'Phú Yên'},
    {label: 'Bình Định'},
    {label: 'Quảng Trị'},
    {label: 'Lai Châu'},
]

const area = [
    {label: 'miền Bắc'},
    {label: 'miền Nam'},
    {label: 'miền Trung'}
]

const center = [
    {label: 'VN0001'},
    {label: 'VN0002'},
    {label: 'VN0003'},
    {label: 'VN0004'},
    {label: 'VN0005'},
    {label: 'VN0006'},
    {label: 'VN0007'},
    {label: 'VN0008'},
]