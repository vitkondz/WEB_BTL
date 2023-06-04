import * as React from 'react';
import './Filter.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
    { label: 2020 },
    { label: 2021 },
    { label: 2022 },
    { label: 2023 },
]