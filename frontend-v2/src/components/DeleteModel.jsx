import React from 'react';

function DeleteModal({ show, onClose, onConfirm, vehicleModel }) {
  if (!show) {
    return null;
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Delete Vehicle</h3>
        <p>Are you sure you want to delete {vehicleModel || 'this vehicle'}?</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={cancelBtnStyle}>
            Cancel
          </button>
          <button onClick={onConfirm} style={deleteBtnStyle}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
};

const cancelBtnStyle = {
  padding: '8px 16px',
  background: '#gray',
  cursor: 'pointer',
};

const deleteBtnStyle = {
  padding: '8px 16px',
  background: 'red',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default DeleteModal;