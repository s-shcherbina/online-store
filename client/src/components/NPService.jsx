import { Stack } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
// import { Context } from '..';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

const NPService = ({ type }) => {
  // const { store } = useContext(Context);
  const [searchLocal, setSearchLocal] = useState('');
  const [locals, setLocals] = useState([]);
  const [depart, setDepart] = useState('');
  const [departs, setDeparts] = useState([]);
  const [locality, setLocality] = useState(null);

  console.log(searchLocal);
  console.log(locals);
  console.log(departs);
  console.log(locality);

  useEffect(() => {
    axios
      .post(`https://api.novaposhta.ua/v2.0/json/Address/getCities`, {
        apiKey: '26918ca4c67cd308f9d351903e4b25b9',
        modelName: 'Address',
        calledMethod: 'getCities',
        methodProperties: {
          FindByString: searchLocal.length > 1 ? searchLocal : '1',
          Limit: 500,
        },
      })
      .then((res) =>
        setLocals(
          res.data.data.map((loc) => {
            return {
              label: `${loc.SettlementTypeDescription} ${loc.Description}  ${
                loc.Description.indexOf('обл') < 0
                  ? '(' + loc.AreaDescription + ' обл.)'
                  : ''
              }`,
              ref: loc.Ref,
            };
          })
        )
      );
  }, [searchLocal]);

  useEffect(() => {
    axios
      .post(
        `https://api.novaposhta.ua/v2.0/json/AddressGeneral/getWarehouses`,
        {
          apiKey: '26918ca4c67cd308f9d351903e4b25b9',
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityRef: locality ? locality.ref : '1',
            FindByString: depart,
            Limit: 500,
          },
        }
      )
      .then((res) =>
        setDeparts(
          res.data.data.map((dep) => {
            return {
              label: dep.Description,
            };
          })
        )
      );
  }, [locality, depart]);

  return (
    <Stack spacing={{ xs: 1, sm: 2 }}>
      <Autocomplete
        value={locality}
        onChange={(event, newValue) => {
          setLocality(newValue);
          setDepart('');
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
      {type && (
        <Autocomplete
          inputValue={depart.replace(
            /[^БВГҐДЖЗКЛМНПРСТФХЦЧШЩЙАЕЄИІЇОУЮЯбвгґджзклмнпрстфхцчшщйаеєиіїоуюяь .,№0-9]/gi,
            ''
          )}
          onInputChange={(event, newInputValue) =>
            setDepart(
              newInputValue.replace(
                /[^БВГҐДЖЗКЛМНПРСТФХЦЧШЩЙАЕЄИІЇОУЮЯбвгґджзклмнпрстфхцчшщйаеєиіїоуюяь .,№0-9]/gi,
                ''
              )
            )
          }
          options={departs}
          isOptionEqualToValue={(option) => option.label}
          renderInput={(params) => (
            <TextField
              variant='standard'
              label='Відділення'
              placeholder='Для пошуку введіть номер або вулицю відділення'
              {...params}
            />
          )}
        />
      )}
    </Stack>
  );
};

export default NPService;
