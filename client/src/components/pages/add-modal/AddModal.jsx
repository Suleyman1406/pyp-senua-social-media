import React from 'react'
import './addModal.css'
import { TextField } from '@mui/material';
import { useState } from 'react';
import List from '../search-friend/List';
import axios from 'axios';
import { Avatar } from '@mui/material';
const AddModal = ({ setAddModal }) => {

  const [inputText, setInputText] = useState("")
  const [user, setUser] = useState([])
  let inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)
  }

  function searchUser() {

    const user = JSON.parse(localStorage.getItem("user"));


    axios.get(`http://localhost:8080/api/user/${inputText}`, {
      headers: {
        "x-access-token": user?.token,
        "content-type": "application/json",
      },
    })
      .then(data => setUser(data))
    console.log('searched', user);
  }
  return (
    <aside className="modal-container" onClick={() => setAddModal(false)}>
      <div className="modal" onClick={(e) => { e.stopPropagation() }} >
        <h4>Search friends</h4>
        <br />
        <div className="main">
          <div className="search">
            <TextField
              id="outlined-basic"
              onChange={inputHandler}
              variant="outlined"
              fullWidth
              label="Search"
              name='value'

            />
          </div>
          {/* 
          <List  /> */}
          <ul>
            {
              <li>
                <header>
                  <Avatar
                    alt="Remy Sharp"
                    src={user.profilePhotoURL ?? ''}
                    sx={{ width: 60, height: 60 }}
                  />
                  <div className='user_info'>
                    <h4>

                    </h4>
                    <p></p>
                  </div>
                </header>
              </li>
            }
          </ul>
        </div>
        <div className="btn-container">
          <button type="button" className="btn clear-btn" style={{ marginTop: '2rem' }} onClick={searchUser} >
            search
          </button>
          <button type="button" className="btn clear-btn" style={{ marginTop: '2rem' }} onClick={() => setAddModal(false)}>
            close
          </button>
        </div>
      </div>
    </aside>
  );
}

export default AddModal