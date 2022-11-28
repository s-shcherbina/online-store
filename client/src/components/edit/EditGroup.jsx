import React, { useContext, useState } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import {
  Delete,
  Shop,
  DataSaverOn,
  PublishedWithChanges,
} from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import {
  createGroup,
  getGroups,
  editGroup,
  removeGroup,
} from '../../http/groupAPI';
import Input from '../helpers/Input';
import DeleteButton from '../helpers/DeleteButton';
import SimpleAutocomlete from '../helpers/SimpleAutocomlete';

const EditGroup = observer(() => {
  const { store } = useContext(Context);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [label, setLabel] = useState('');

  return (
    <Stack
      spacing={1}
      sx={{
        border: '2px solid darkgray',
        borderRadius: 2,
        p: 1.5,
      }}
    >
      {/* {!!store.groups.length && ( */}
      {store.selectedGroup && (
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
            Оберіть групу:
          </Typography>
          <SimpleAutocomlete
            label='група'
            value={store.selectedGroup}
            changeValue={(event, newValue) => store.setSelectedGroup(newValue)}
            options={store.groups}
          />
        </Stack>
      )}
      <Button
        variant='outlined'
        endIcon={<Shop />}
        onClick={() => setAdd(true)}
      >
        Додати групу
      </Button>
      <hr />
      <Input
        show={add}
        onHide={() => setAdd(false)}
        label={label}
        buttonLabel='Додати'
        endIcon={<DataSaverOn />}
        changeLabel={(e) => setLabel(e.target.value)}
        changeItem={() =>
          createGroup({ label })
            .then((data) => store.setSelectedGroup(data))
            .then(() => getGroups())
            .then((data) => store.setGroups(data))
            .finally(() => {
              setLabel('');
              setAdd(false);
            })
        }
      />
      <Button
        disabled={!store.selectedGroup}
        variant='outlined'
        endIcon={<Shop />}
        color='warning'
        onClick={() => setEdit(true)}
      >
        Редагувати
      </Button>
      <hr />
      <Input
        show={edit}
        onHide={() => setEdit(false)}
        label={store.selectedGroup && store.selectedGroup.label}
        buttonLabel='Змінити'
        endIcon={<PublishedWithChanges />}
        changeLabel={(e) =>
          store.setSelectedGroup({
            ...store.selectedGroup,
            label: e.target.value,
          })
        }
        changeItem={() =>
          editGroup(store.selectedGroup.id, {
            label: store.selectedGroup.label,
          })
            .then((data) => store.setSelectedGroup(data))
            .then(() => getGroups())
            .then((data) => store.setGroups(data))
            .finally(() => setEdit(false))
        }
      />
      <Button
        disabled={!store.selectedGroup}
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
        value={store.selectedGroup && store.selectedGroup.label}
        removeItem={() =>
          removeGroup(store.selectedGroup && store.selectedGroup.id)
            .then(() => getGroups())
            .then((data) => store.setGroups(data))
            .then(() =>
              store.setSelectedGroup(
                !!store.groups.length ? store.groups[0] : null
              )
            )
            .finally(() => setRemove(false))
        }
      />
    </Stack>
  );
});

export default EditGroup;
