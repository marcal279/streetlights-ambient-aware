// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all origins (useful during development)
// CORS = Cross Origin Resource Sharing
app.use(cors());    // CORS on

// Middleware to parse JSON bodies
app.use(express.json());

// Open (or create) the SQLite database file

// Primary Key = Unique + NOt null
// Autoincrement = increment auto XD
const db = new sqlite3.Database('./streetlights.db', (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create the table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS streetlights (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         coordinates TEXT,
         status TEXT
       )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        }
      }
    );
  }
});

/* ---------------- CRUD API Endpoints ---------------- */
/**
 * READ ALL
 * GET /streetlights-status-info
 */
app.get('/streetlights-status-info', (req, res) => {
  db.all("SELECT * FROM streetlights", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

/**
 * READ ONE
 * GET /streetlights-status-info/:id
 */
app.get('/streetlights-status-info/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM streetlights WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.json(row);
    }
  });
});

/**
 * CREATE
 * POST /streetlights-status-info
 * Expects a JSON body containing: { coordinates, status }
 */
app.post('/streetlights-status-info', (req, res) => {
  const { coordinates, status } = req.body;
  const sql = "INSERT INTO streetlights (coordinates, status) VALUES (?, ?)";
  db.run(sql, [coordinates, status], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

/**
 * UPDATE
 * PUT /streetlights-status-info/:id
 * Expects a JSON body containing updated: { coordinates, status }
 */
// TODO: should this be a PATCH instead of PUT? Fix later
app.put('/streetlights-status-info/:id', (req, res) => {
  const id = req.params.id;
  const { coordinates, status } = req.body;
  const sql = "UPDATE streetlights SET coordinates = ?, status = ? WHERE id = ?";
  db.run(sql, [coordinates, status, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.json({ updated: this.changes });
    }
  });
});

/**
 * Delete Record
 * DELETE /streetlights-status-info/:id
 */
app.delete('/streetlights-status-info/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM streetlights WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.json({ deleted: this.changes });
    }
  });
});

/* -------------- Start Server -------------- */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
