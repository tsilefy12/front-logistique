import React,{useState} from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const [offre, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  export default handleChange;