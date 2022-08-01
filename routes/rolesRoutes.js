const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const inputCheck = require('../utils/inputCheck');
const cTable = require('console.table');

// get the roles Table
const roleTable = () => {
    return db.promise().query(roles)
        .then(([rows]) => {
            console.table(rows);
        });
};

// Get all Roles and their Departments
router.get('/roles', (req, res) => {
  const sql = `SELECT roles.*, department.name 
                AS department_name 
                FROM roles 
                LEFT JOIN department 
                ON roles.department_id = department.id`;

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

// Get single roles with department affiliation
router.get('/roles/:id', (req, res) => {
  const sql = `SELECT roles.*, department.name 
               AS department_name 
               FROM roles 
               LEFT JOIN department 
               ON roles.department_id = department.id 
               WHERE roles.id = ?`;
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

// Create a roles
router.post('/roles', ({ body }, res) => {
  const errors = inputCheck(
    body,
    'title',
    'salary',
    'department_id'
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
  const params = [
    body.title,
    body.salary,
    body.department_id
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Update a roles's department
router.put('/roles/:id', (req, res) => {
  const errors = inputCheck(req.body, 'department_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE roles SET department_id = ? 
               WHERE id = ?`;
  const params = [req.body.department_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'roles not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Delete a roles
router.delete('/roles/:id', (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'roles not found'
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
