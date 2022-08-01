const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const cTable = require('console.table');

// global variables for SQL
const displayTable = `SELECT * FROM department`;

// const function to get the table to display in rows
const getTable = () => {
    return db.promise().query(displayTable).then(([rows]) => {
        return rows;
    });
};
// shows table to the user via console logs
const showTable = () => {
    getTable().then(data => {
        cTable(data);
    });
};


// Get all departments
router.get('/department', (req, res) => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get single department
router.get('/department/:id', (req, res) => {
  const sql = `SELECT * FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Delete a department
router.delete('/department/:id', (req, res) => {
  const sql = `DROP FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'department not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

module.exports = router;
