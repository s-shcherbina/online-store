import React, { useContext, useState } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import {
  DataSaverOn,
  Delete,
  LocalFlorist,
  PublishedWithChanges,
} from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import {
  createFlower,
  getFlowers,
  editFlower,
  removeFlower,
} from '../../http/flowerAPI';
import GoodInput from '../helpers/GoodInput';
import DeleteButton from '../helpers/DeleteButton';
import SimpleAutocomlete from '../helpers/SimpleAutocomlete';

const EditGood = observer(() => {
  const { store } = useContext(Context);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [label, setLabel] = useState('');
  const [price, setPrice] = useState('0');
  const [text, setText] = useState('');

  return (
    <Stack
      spacing={1}
      sx={{
        border: '2px solid darkgray',
        borderRadius: 2,
        p: 1.5,
      }}
    >
      {/* {!!store.flowers.length && ( */}
      {store.selectedFlower && (
        <Stack
          spacing={0.5}
          sx={{
            border: '1px solid darkgray',
            borderRadius: 1,
            p: 1,
          }}
        >
          <Typography
            variant='body1'
            color='primary'
            sx={{ alignSelf: 'center' }}
          >
            Оберіть товар:
            <br />
          </Typography>
          <SimpleAutocomlete
            label='товар'
            value={store.selectedFlower}
            changeValue={(event, newValue) => store.setSelectedFlower(newValue)}
            options={store.flowers}
          />
        </Stack>
      )}
      <Button
        disabled={!store.selectedGroup}
        variant='outlined'
        endIcon={<LocalFlorist />}
        onClick={() => {
          setAdd(true);
        }}
      >
        Додати товар
      </Button>
      <hr />
      <GoodInput
        show={add}
        onHide={() => setAdd(false)}
        label={label}
        buttonLabel='Додати'
        endIcon={<DataSaverOn />}
        changeLabel={(e) => setLabel(e.target.value)}
        changePrice={(e) => setPrice(e.target.value)}
        changeText={(e) => setText(e.target.value)}
        changeItem={() =>
          createFlower({
            label,
            price,
            text,
            groupId: store.selectedGroup.id,
            subGroupId: store.selectedSubGroup ? store.selectedSubGroup.id : 0,
          })
            .then((data) => store.setSelectedFlower(data))
            .then(() =>
              getFlowers(
                store.selectedGroup ? store.selectedGroup.id : 0,
                store.selectedSubGroup ? store.selectedSubGroup.id : 0
              )
            )
            .then((data) => store.setFlowers(data))
            .finally(() => {
              setLabel('');
              setPrice('');
              setText('');
              setAdd(false);
            })
        }
      />
      <Button
        disabled={!store.selectedFlower}
        variant='outlined'
        endIcon={<LocalFlorist />}
        color='warning'
        onClick={() => setEdit(true)}
      >
        Редагувати
      </Button>
      <hr />
      <GoodInput
        show={edit}
        onHide={() => setEdit(false)}
        label={store.selectedFlower && store.selectedFlower.label}
        price={store.selectedFlower && store.selectedFlower.price}
        text={store.selectedFlower && store.selectedFlower.text}
        buttonLabel='Змінити'
        endIcon={<PublishedWithChanges />}
        changeLabel={(e) =>
          store.setSelectedFlower({
            ...store.selectedFlower,
            label: e.target.value,
          })
        }
        changePrice={(e) =>
          store.setSelectedFlower({
            ...store.selectedFlower,
            price: e.target.value,
          })
        }
        changeText={(e) =>
          store.setSelectedFlower({
            ...store.selectedFlower,
            text: e.target.value,
          })
        }
        changeItem={() =>
          editFlower(store.selectedFlower.id, {
            label: store.selectedFlower.label,
            price: store.selectedFlower.price,
            text: store.selectedFlower.text,
          })
            .then((data) => store.setSelectedFlower(data))
            .then(() =>
              getFlowers(
                store.selectedGroup ? store.selectedGroup.id : 0,
                store.selectedSubGroup ? store.selectedSubGroup.id : 0
              )
            )
            .then((data) => store.setFlowers(data))
            .finally(() => setEdit(false))
        }
      />
      <Button
        disabled={!store.selectedFlower}
        variant='outlined'
        endIcon={<Delete />}
        color='error'
        onClick={() => setRemove(true)}
      >
        Видадити
      </Button>
      <DeleteButton
        show={remove}
        onHide={() => setRemove(false)}
        value={store.selectedFlower && store.selectedFlower.label}
        removeItem={() =>
          removeFlower(store.selectedFlower && store.selectedFlower.id)
            .then(() =>
              getFlowers(
                store.selectedGroup && store.selectedGroup.id,
                store.selectedSubGroup ? store.selectedSubGroup.id : 0
              )
            )
            .then((data) => store.setFlowers(data))
            .then(() =>
              store.setSelectedFlower(store.flowers ? store.flowers[0] : null)
            )
            .finally(() => setRemove(false))
        }
      />
    </Stack>
  );
});

export default EditGood;
