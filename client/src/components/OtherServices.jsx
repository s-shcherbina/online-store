import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Autocomplete, Stack, TextField } from '@mui/material';

const OtherServices = ({ service, type }) => {
  const [searchLocal, setSearchLocal] = useState('');
  const [locals, setLocals] = useState([]);
  const [locality, setLocality] = useState(null);
  const [number, setNumber] = useState('');

  console.log(locality);
  console.log(number);

  useEffect(() => {
    axios
      .post(`https://api.novaposhta.ua/v2.0/json/Address/searchSettlements/`, {
        apiKey: '69632745cbe138ad8b3fd7a0d81ea5f6',
        modelName: 'Address',
        calledMethod: 'searchSettlements',
        methodProperties: {
          CityName: searchLocal.length > 1 ? searchLocal : '',
          Limit: 500,
        },
      })
      .then((res) =>
        setLocals(
          res.data.data[0].Addresses.map((adress) => {
            return { label: adress.Present };
          })
        )
      );
  }, [searchLocal]);
  return (
    <Stack spacing={{ xs: 1, sm: 2 }}>
      <Autocomplete
        value={locality}
        onChange={(event, newValue) => {
          setLocality(newValue);
        }}
        inputValue={searchLocal.replace(
          /[^БВГҐДЖЗКЛМНПРСТФХЦЧШЩЙАЕЄИІЇОУЮЯбвгґджзклмнпрстфхцчшщйаеєиіїоуюяь .-]/gi,
          ''
        )}
        onInputChange={(event, newInputValue) => {
          setSearchLocal(
            newInputValue.replace(
              /[^БВГҐДЖЗКЛМНПРСТФХЦЧШЩЙАЕЄИІЇОУЮЯбвгґджзклмнпрстфхцчшщйаеєиіїоуюяь .-]/gi,
              ''
            )
          );
        }}
        options={locals}
        isOptionEqualToValue={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Населений пункт'}
            variant='standard'
            placeholder='Для пошуку введіть минимум 2 літери'
          />
        )}
      />

      {service === 'Укрпошта' ? (
        <TextField
          variant='standard'
          label='індекс'
          type='number'
          placeholder='Індекс відділення укрпошти(5 цифр)'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      ) : (
        type && (
          <TextField
            variant='standard'
            label='№ відділення'
            type='number'
            value={number}
            onChange={(e) => setNumber(e.target.number)}
          />
        )
      )}
    </Stack>
  );
};

export default OtherServices;
