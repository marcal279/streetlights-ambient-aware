// src/ActionButton.js

import React from 'react';

function ActionButton({ label, onClick }) {
  return (
    <button
      style={{ marginRight: '5px', padding: '5px 10px' }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default ActionButton;