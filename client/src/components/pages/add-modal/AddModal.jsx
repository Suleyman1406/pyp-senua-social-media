import React from 'react'
import './addModal.css'

const AddModal = ({setAddModal}) => {
  return (
    <aside className="modal-container">
    <div className="modal">
      <h4>Search friends</h4>
      <div className="btn-container">
        <button
          type="button"
          className="btn confirm-btn"
         
        >
          confirm
        </button>
        <button type="button" className="btn clear-btn" onClick={()=>setAddModal(false)}>
          close
        </button>
      </div>
    </div>
  </aside>
);
}

export default AddModal