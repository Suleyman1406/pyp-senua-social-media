import { TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import List from './List';

const SearchInput = () => {
    const [inputText,setInputText]=useState("")
    let inputHandler=(e)=>{
        let lowerCase=e.target.value.toLowerCase()
        setInputText(lowerCase)
    }
  return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <List input={inputText} />
    </div>
  );
}

export default SearchInput