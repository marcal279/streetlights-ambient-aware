// src/App.js

import React, { useState, useEffect } from 'react';
import StreetlightsTable from './StreetlightsTable';
import RecordModal from './RecordModal';

function App() {
  const [records, setRecords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'update'
  const [currentRecord, setCurrentRecord] = useState(null);

  const API_URL = 'http://localhost:3001/streetlights-status-info';

  // CRUD Operations

  // Read All records
  const readAllRecords = async () => {
    try {
      console.log('Inside read all records');
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setRecords(data);
    } catch (err) {
      console.error('Error fetching records:', err);
    }
  };

  // Create Record
  const createRecord = async (recordData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recordData)
    });
    if(!response.ok){
      throw new Error("Error adding record");
    }
  };

  // Update Record
  const updateRecord = async (id, recordData) => {
    console.log(`Inside DB Update for id: ${id}, recordData: ${recordData}`);
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recordData)
    });
    if(!response.ok){
      throw new Error(`Error updating record ${id}`);
    }
  };

  // Delete Record
  const deleteRecord = async (id) =>{
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if(!response.ok){
      throw new Error(`Error in deleting record ${id}`);
    }
  }

  useEffect(() => {
    readAllRecords();
  }, []);

  // Open modal for adding a new record
  const openCreateModal = () => {
    setModalMode('create');
    setCurrentRecord(null);
    setModalOpen(true);
  };

  // const createStreetligh

  // Open modal for updating an existing record (passed from table)
  const openUpdateModal = (record) => {
    setModalMode('update');
    setCurrentRecord(record);
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle form submission from the modal
  const handleModalSubmit = async (recordData) => {
    try {
      if (modalMode === 'create') {
        // Create a new record with POST
        await createRecord(recordData);
      } else if (modalMode === 'update' && currentRecord) {
        await updateRecord(currentRecord.id, recordData)
      }
    } catch (error) {
      console.error('Error in modal submit:', error);
    } finally {
      closeModal();
      readAllRecords(); // Refresh the records list after action
    }
  };

  const handleDeleteRecord = async (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete Streetlight ${id}?`);
    if(confirmDelete){
      await deleteRecord(id);
      readAllRecords();
    }
  }

  return (
    <div>
      <h1>Streetlights Dashboard</h1>
      <button onClick={openCreateModal}>Add New Record</button>
      <StreetlightsTable records={records} onEdit={openUpdateModal} refreshRecords={readAllRecords} handleDelete={handleDeleteRecord}/>
      <RecordModal
        isOpen={modalOpen}
        mode={modalMode}
        initialData={currentRecord}
        onSubmit={handleModalSubmit}
        onCancel={closeModal}
      />
    </div>
  );
}

export default App;
