// src/RecordModal.js

import React, { useState, useEffect } from 'react';

function RecordModal({ isOpen, mode, initialData, onSubmit, onCancel }) {
  const [coordinates, setCoordinates] = useState('');
  const [status, setStatus] = useState('');

  // Prepopulate fields when updating, or clear them on create/open
  useEffect(() => {
    if (initialData) {
      setCoordinates(initialData.coordinates);
      setStatus(initialData.status);
    } else {
      setCoordinates('');
      setStatus('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleAction = () => {
    // Pass input values back to the parent
    onSubmit({ coordinates, status });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '90%'
        }}
      >
        <h3>{mode === 'create' ? 'Add New Record' : 'Update Record'}</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Coordinates:{' '}
            <input
              type="text"
              value={coordinates}
              onChange={(e) => setCoordinates(e.target.value)}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Status:{' '}
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button onClick={handleAction}>
            {mode === 'create' ? 'Add' : 'Update'}
          </button>
          <button onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecordModal;