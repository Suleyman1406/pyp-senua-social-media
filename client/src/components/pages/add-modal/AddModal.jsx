import React from 'react'
import SearchInput from '../search-friend/SearchInput';
import './addModal.css'

const AddModal = ({setAddModal}) => {
  return (
    <aside className="modal-container">
    <div className="modal">
      <h4>Search friends</h4>
      <br/>
      <SearchInput/>
      <div className="btn-container">
       
        <button type="button" className="btn clear-btn" style={{marginTop:'2rem'}} onClick={()=>setAddModal(false)}>
          close
        </button>
      </div>
    </div>
  </aside>
);
}

export default AddModal