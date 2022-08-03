const db = require('./db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer')

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  initalQuestions()
});

const initalQuestions = () => {
  const options = [
      "View All Employees",
      "View All Roles",
      "View All Departments",
      "Add an Employee",
      "Add a Role",
      "Add a Department",
      "Update an Employee's Role",
      "Exit",
  ];
  inquirer.prompt([
          {
              type: "list",
              name: "choice",
              message: "Access your Employee tracker!",
              choices: options,
          },
      ])
      .then(({ choice }) => {
          switch (choice) {
              case "View All Employees":
                viewAllEmployees()
                  break;
              case "View All Roles":
                viewAllRoles()
                  break;
              case "View All Departments":
                viewAllDpts()
                  break;
              case "Add an Employee":
                addEmployee()
                  break;
              case "Add a Role":
                addRole()
                  break;
              case "Add a Department":
                addDepartment()
                  break;
              case "Update an Employee's Role":
                updateEmployeeRole()
                  break;
              case "Exit":
                  process.exit();
          }
      });
};


const viewAllDpts = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        throw err 
      }
      console.table(rows)
      initalQuestions()
    });
}

const viewAllRoles = () => {
    const sql = `SELECT roles.id, roles.title, roles.salary, department.name 
                AS department_name 
                FROM roles 
                LEFT JOIN department 
                ON roles.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      throw err;     
    }
    console.table(rows)
      initalQuestions()
    });
}

const viewAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.created_at, roles.title 
                AS title,
                manager.first_name as manager 
                FROM employee 
                LEFT JOIN roles 
                ON employee.roles_id = roles.id
                LEFT JOIN employee manager on manager.id = employee.manager_id`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;     
    }
    console.table(rows)
      initalQuestions()
    });
}
const addEmployee = () => {
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'first_name',
      message: 'Whats the employees first name?', 
      validate: first_nameInput => {
          if (first_nameInput) {
              return true;
          } else {
              console.log ("Please enter the employees first name!");
              return false; 
          }
      }
  },
  {
      type: 'input',
      name: 'last_name',
      message: "Whats the employees last name?",
      validate: last_nameInput => {
          if  (!last_nameInput) {
              console.log ("Please enter the employees last name!");
              return false; 
          } else {
              return true;
          }
      }
  },
  {
      type: 'input',
      name: 'roles_id',
      message: "Please enter the id of the employees role",
      validate: roles_idInput => {
          if  (!roles_idInput) {
              console.log ("Please enter the employees role ID!")
              return false; 
          } else {
              return true;
          }
      }
  },
  {
      type: 'input',
      name: 'manager_id',
      message: "Please enter the id of the employees manager",
      validate: manager_idInput => {
          if  (!manager_idInput) {
              console.log ("Please enter the employees manager ID!")
              return false; 
          } else {
              return true;
          }
      }
  }
])
  .then(answers => {
  const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)`;
  const params = [
    answers.first_name,
    answers.last_name,
    answers.roles_id,
    answers.manager_id
  ];
  db.query(sql, params, (err, result) => {
    if (err) {
      throw err
    }
    console.log('Your new employee as been added')
    initalQuestions()
  });
})
}

const addRole = () => {
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'title',
      message: 'Whats the title of this role?', 
      validate: titleInput => {
          if (titleInput) {
              return true;
          } else {
              console.log ("Please enter the title for this role!");
              return false; 
          }
      }
  },
  {
      type: 'input',
      name: 'salary',
      message: "Whats the Salary for this role?",
      validate: salaryInput => {
          if  (!salaryInput) {
              console.log ("Please enter this roles salary!");
              return false; 
          } else {
              return true;
          }
      }
  },
  {
      type: 'input',
      name: 'department_id',
      message: "Please enter the department ID for this role",
      validate: department_idInput => {
          if  (!department_idInput) {
              console.log ("Please enter the department ID!")
              return false; 
          } else {
              return true;
          }
      }
  },
])  
  .then(answers => {
  const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
  const params = [
    answers.title,
    answers.salary,
    answers.department_id
  ];
  db.query(sql, params, (err, result) => {
    if (err) {
      throw err
    }
    console.log('Your new role has been added')
    initalQuestions()
  });
})
}

const addDepartment = () => {
    inquirer
  .prompt({
    type: 'input',
    name: 'newDepartment',
    message: 'what would you like to name the new department?'
})
  .then(answers => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
  const params = [
    answers.newDepartment,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      throw err
    }
    console.log('Your new department as been added')
    initalQuestions()

  });
  })
}

const updateEmployeeRole = () => {
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'id',
      message: 'please enter the employee id for the updated role', 
      validate: idInput => {
          if (idInput) {
              return true;
          } else {
              console.log ("Please enter the employee ID");
              return false; 
          }
      }
  },
  {
      type: 'input',
      name: 'roles_id',
      message: "enter the new role ID",
      validate: roles_idInput => {
          if  (!roles_idInput) {
              console.log ("Please enter updated role ID!");
              return false; 
          } else {
              return true;
          }
      }
  }
]) 
.then(answers => {
  const sql = `UPDATE employee SET roles_id= ? WHERE id= ?`;
  const params = [
    
    answers.roles_id,
    answers.id,
  ];
  db.query(sql, params, (err, result) => {
    if (err) {
      throw err
    }
    console.log('Your new employee has been updated')
    initalQuestions()
  });
})
}
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