import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';

const Main = () => {
  const items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
    },
    {
      name: 'Random Name #3',
      description: 'Probably the most random thing you have ever seen!',
    },
    {
      name: 'Random Name #4',
      description: 'Button classNameCheckButtonCheck it out!',
    },
  ];
  return (
    <Carousel>
      {items.map((item, i) => (
        <Box key={i} sx={{ height: 600 }}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>

          {/* <Button className='CheckButton'>Check it out!</Button> */}
        </Box>
      ))}
    </Carousel>
  );
};

export default Main;
