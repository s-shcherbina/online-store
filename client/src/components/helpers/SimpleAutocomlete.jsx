import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const SimpleAutocomlete = ({ label, value, changeValue, options }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      value={value}
      onChange={changeValue}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      isOptionEqualToValue={(option) => option.label}
      getOptionLabel={(option) => (option.label ? option.label : '')}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default SimpleAutocomlete;
