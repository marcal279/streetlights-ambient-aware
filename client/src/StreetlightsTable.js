// src/StreetlightsTable.js

import React from 'react';
import ActionButton from './ActionButton';

function StreetlightsTable({ records, onEdit, refreshRecords, handleDelete }) {
  // DELETE handler: calls the DELETE endpoint and then refreshes the data.
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3001/streetlights-status-info/${id}`, {
//         method: 'DELETE'
//       });
//       if (!response.ok) {
//         throw new Error('Delete failed: ' + response.statusText);
//       }
//       // Refresh the table
//       refreshRecords();
//     } catch (error) {
//       console.error('Delete error:', error);
//     }
//   };

  return (
    <div>
      <h2>Streetlights Status Info</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Coordinates</th>
            <th>Status</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.coordinates}</td>
              <td>{record.status}</td>
              <td>
                <ActionButton
                  label="Update"
                  onClick={() => onEdit(record)}
                />
                <ActionButton
                  label="Delete"
                  onClick={() => handleDelete(record.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StreetlightsTable;
