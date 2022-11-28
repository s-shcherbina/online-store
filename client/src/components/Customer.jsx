import {
  Stack,
  TextField,
  Typography,
  Input,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { Context } from '..';
import PropTypes from 'prop-types';
import NPService from './NPService';
import OtherServices from './OtherServices';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='+38(#00) 000-00-00'
      definitions={{
        '#': /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Customer = () => {
  const { store } = useContext(Context);
  const [values, setValues] = useState({ textmask: '' });
  const [inputValue, setInputValue] = useState('');
  const [service, setService] = useState(null);
  const [type, setType] = useState('');

  console.log(values.textmask);
  console.log(service, type);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Stack spacing={{ xs: 1, sm: 2 }}>
      <Typography variant='h6' sx={{ ml: 2 }}>
        Отримувач замовлення
      </Typography>
      <TextField variant='standard' label='Прізвище, ім`я' />
      <FormControl variant='standard'>
        <InputLabel htmlFor='formatted-text-mask-input'>Телефон</InputLabel>
        <Input
          value={values.textmask}
          onChange={handleChange}
          name='textmask'
          inputComponent={TextMaskCustom}
        />
      </FormControl>
      <Autocomplete
        options={['Нова пошта', 'Укрпошта']}
        value={service}
        onChange={(e, newValue) => setService(newValue)}
        inputValue={inputValue}
        onInputChange={(e, newInputValue) => {
          setInputValue(
            newInputValue.replace(
              /[^A-Za-zБВГҐДЖЗКЛМНПРСТФХЦЧШЩЙАЕЄИІЇОУЮЯбвгґджзклмнпрстфхцчшщйаеєиіїоуюяь -]/gi,
              //[^A-Za-zА-Яа-я -ҐґЄєЇї]/gi,
              ''
            )
          );
        }}
        onBlur={() => setService(inputValue)}
        freeSolo
        renderInput={(params) => (
          <TextField
            variant='standard'
            label='Доставка'
            placeholder='Виберіть або введіть іншу службу доставки'
            {...params}
          />
        )}
      />
      {service && (
        <>
          <FormControl variant='standard'>
            <InputLabel>Тип доставки</InputLabel>
            <Select
              value={type}
              label='Доставка'
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={true}>
                До відділення {service && `"${service}"`}
              </MenuItem>
              <MenuItem value={false}>
                За адресою ( + витрати на курьера)
              </MenuItem>
            </Select>
          </FormControl>

          {service === 'Нова пошта' ? (
            <NPService type={type} />
          ) : (
            <OtherServices service={service} type={type} />
          )}

          {!type && type !== '' && (
            <TextField
              variant='standard'
              label='Адреса'
              placeholder='Вулиця, № буд, № кв'
            />
          )}
        </>
      )}
    </Stack>
  );
};

export default Customer;
