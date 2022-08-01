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

const initalQuestions = () => {
  const options = [
      "View All Employees",
      "View All Roles",
      "View All Departments",
      "View Employees by Manager",
      "Add an Employee",
      "Add a Role",
      "Add a Department",
      "Update an Employee's Role",
      "Delete an Employee",
      "Delete a Role",
      "Delete a Department",
      "Exit",
  ];
  inquirer
  // prompting the user with inquirer to select from the options above
      .prompt([
          {
              type: "list",
              name: "choice",
              message: "Access your Employee tracker!",
              choices: options,
          },
      ])
      .then(({ choice }) => {
          // switch for all the choices that the user may select with applicable functions to run as they should 
          switch (choice) {
              case "View All Employees":
                  break;
              case "View All Roles":
                  break;
              case "View All Departments":
                  break;
              case "View Employees by Manager":
              case "Add an Employee":
                  break;
              case "Add a Role":
                  break;
              case "Add a Department":
                  break;
              case "Update an Employee's Role":
                  break;
              case "Delete an Employee":
                  break;
              case "Delete a Role":
                  break;
              case "Delete a Department":
                  break;
              case "Exit":
                  process.exit();
          }
      });
};


module.exports = initalQuestions
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