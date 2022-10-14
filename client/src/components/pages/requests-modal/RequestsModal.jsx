import React, { useEffect } from "react";
import Invitation from "../invitation/Invitation";
import "./requestsModal.css";
const RequestsModal = ({ setReqModal }) => {


  return (
    <aside className="modal-container" onClick={() => setReqModal(false)}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4>Invitations</h4>
        <Invitation />
        <div className="btn-container">
       
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => setReqModal(false)}
          >
            close
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RequestsModal;
