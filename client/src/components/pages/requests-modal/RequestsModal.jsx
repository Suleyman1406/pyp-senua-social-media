import React from "react";
import Invitation from "../invitation/Invitation";
import "./requestsModal.css";

const RequestsModal = ({setReqModal}) => {
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Invitations</h4>
     
       <Invitation/>
        <div className="btn-container">
          <button type="button" className="btn confirm-btn">
            remove all
          </button>
          <button type="button" className="btn clear-btn" onClick={()=>setReqModal(false)}>
            close
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RequestsModal;
