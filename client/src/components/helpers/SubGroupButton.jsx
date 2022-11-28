import React, { useContext, useRef, useState } from 'react';
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  Box,
  CardMedia,
  ButtonGroup,
  IconButton,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { Context } from '../..';
import { baseURL } from '../../http';
import { KeyboardArrowDown } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { getSubGroups } from '../../http/subGroupAPI';

const SubGroupButton = observer(({ group }) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState('');

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  console.log(store.selectedGroup.label, store.SubGroups);

  return (
    <>
      <Button
        variant='text'
        ref={anchorRef}
        aria-haspopup='menu'
        onMouseOver={() => {
          // store.setSelectedGroup(group);
          // store.setSelectedSubGroup('');
          setSelectedIndex('');
          // navigate('/');
          // setOpen(true);
          // getSubGroups(group ? group.id : 0)
          localStorage.setItem('groupId', group.id);
          getSubGroups(group.id)
            .then((data) => store.setSubGroups(data))
            .then(() => setOpen(true));
        }}
        onMouseLeave={() => setOpen(false)}
        onClick={() => {
          store.setSelectedGroup(group);
          // setSelectedIndex('');
          store.setSelectedSubGroup(null);
          navigate('/group');
          // localStorage.setItem('groupId', group.id);
          setOpen(false);
        }}
      >
        {' '}
        {group.label}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        sx={{ zIndex: 2 }}
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        // onMouseOut={() => setOpen(false)}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem onMouseOut={() => setOpen(false)}>
                  {store.subGroups.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      sx={{
                        color: blue[700],
                        fontSize: 18,
                      }}
                      selected={index === selectedIndex}
                      onClick={(event) => {
                        store.setSelectedGroup(group);
                        localStorage.setItem('groupId', group.id);
                        store.setSelectedSubGroup(option);
                        handleMenuItemClick(event, index);
                        localStorage.setItem('subGroupId', option.id);
                        navigate('/sub_group');
                        setOpen(false);
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CardMedia
                          image={
                            // store.s &&
                            baseURL + store.images[0]?.img
                          }
                          sx={{
                            height: 40,
                            borderRadius: 1,
                            width: 50,
                            m: '0 auto',
                            p: 1,
                          }}
                        />
                        <Box sx={{ p: 1 }}>{option.label}</Box>
                      </Box>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {/* <ButtonGroup ref={anchorRef} aria-label='split button'>
      <Button
        variant='text'
        onClick={() => {
          store.setSelectedGroup(group);
          setSelectedIndex('');
          store.setSelectedSubGroup(null);
          navigate('/group');
          localStorage.setItem('groupId', group.id);
          setOpen(false);
        }}
      >
        {' '}
        {group.label}
      </Button>
      <IconButton
        color='primary'
        sx={{ ml: -2 }}
        aria-controls={open ? 'split-button-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='menu'
        onClick={() => {
          getSubGroups(group ? group.id : 0)
            .then((data) => store.setSubGroups(data))
            .then(() => handleToggle());
        }}
      >
        <KeyboardArrowDown />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        sx={{ zIndex: 2 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {store.subGroups.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      sx={{
                        color: blue[700],
                        fontSize: 18,
                      }}
                      selected={index === selectedIndex}
                      onClick={(event) => {
                        store.setSelectedGroup(group);
                        localStorage.setItem('groupId', group.id);
                        store.setSelectedSubGroup(option);
                        handleMenuItemClick(event, index);
                        localStorage.setItem('subGroupId', option.id);
                        navigate('/sub_group');
                        setOpen(false);
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CardMedia
                          image={
                            store.selectedImage &&
                            baseURL + store.selectedImage.img
                          }
                          sx={{
                            height: 40,
                            borderRadius: 1,
                            width: 50,
                            m: '0 auto',
                            p: 1,
                          }}
                        />
                        <Box sx={{ p: 1 }}>{option.label}</Box>
                      </Box>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ButtonGroup> */}
    </>
  );
});

export default SubGroupButton;
