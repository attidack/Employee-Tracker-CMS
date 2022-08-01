const express = require('express');
const db = require('./db/connection');
const Routes = require('./routes');

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/', Routes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
});




/*
inital choices

view all departments,
view all roles,
view all employees,
add a department,
add a role,
add an employee,
update an employee role



view all departments
 a formatted table showing department names and department ids

view all roles
  job title,
  role id,
  the department that role belongs to,
  and the salary for that role


view all employees
  a formatted table showing
    employee ids,
    first names, 
    last names, 
    job titles, 
    departments, 
    salaries,
    managers that the employees report to


WHEN I choose to add a department
 enter the name of the department and that department is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
*/