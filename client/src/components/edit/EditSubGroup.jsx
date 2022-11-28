import React, { useContext, useState } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import {
  DataSaverOn,
  Delete,
  PublishedWithChanges,
  Shop2,
} from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import {
  createSubGroup,
  getSubGroups,
  editSubGroup,
  removeSubGroup,
} from '../../http/subGroupAPI';
import Input from '../helpers/Input';
import DeleteButton from '../helpers/DeleteButton';
import SimpleAutocomlete from '../helpers/SimpleAutocomlete';

const EditSubGroup = observer(() => {
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
      {/* {!!store.subGroups.length && ( */}
      {store.selectedSubGroup && (
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
            Оберіть підгрупу:
            <br />
          </Typography>
          <SimpleAutocomlete
            label='підгрупа'
            value={store.selectedSubGroup}
            changeValue={(event, newValue) =>
              store.setSelectedSubGroup(newValue)
            }
            options={store.subGroups}
          />
        </Stack>
      )}
      <Button
        disabled={!store.selectedGroup}
        variant='outlined'
        endIcon={<Shop2 />}
        onClick={() => {
          setAdd(true);
        }}
      >
        Додати підгрупу
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
          createSubGroup({ label, groupId: store.selectedGroup.id })
            .then((data) => store.setSelectedSubGroup(data))
            .then(() =>
              getSubGroups(store.selectedGroup ? store.selectedGroup.id : 0)
            )
            .then((data) => store.setSubGroups(data))
            .finally(() => {
              setLabel('');
              setAdd(false);
            })
        }
      />
      <Button
        disabled={!store.selectedSubGroup}
        variant='outlined'
        endIcon={<Shop2 />}
        color='warning'
        onClick={() => setEdit(true)}
      >
        Редагувати
      </Button>
      <hr />
      <Input
        show={edit}
        onHide={() => setEdit(false)}
        label={store.selectedSubGroup && store.selectedSubGroup.label}
        buttonLabel='Змінити'
        endIcon={<PublishedWithChanges />}
        changeLabel={(e) =>
          store.setSelectedSubGroup({
            ...store.selectedSubGroup,
            label: e.target.value,
          })
        }
        changeItem={() =>
          editSubGroup(store.selectedSubGroup.id, {
            label: store.selectedSubGroup.label,
          })
            .then((data) => store.setSelectedSubGroup(data))
            .then(() => getSubGroups())
            .then((data) => store.setSubGroups(data))
            .finally(() => setEdit(false))
        }
      />
      <Button
        disabled={!store.selectedSubGroup}
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
        value={store.selectedSubGroup && store.selectedSubGroup.label}
        removeItem={() =>
          removeSubGroup(store.selectedSubGroup && store.selectedSubGroup.id)
            .then(() =>
              getSubGroups(store.selectedGroup && store.selectedGroup.id)
            )
            .then((data) => store.setSubGroups(data))
            .then(() =>
              store.setSelectedSubGroup(
                store.subGroups ? store.subGroups[0] : null
              )
            )
            .finally(() => setRemove(false))
        }
      />
    </Stack>
  );
});

export default EditSubGroup;
