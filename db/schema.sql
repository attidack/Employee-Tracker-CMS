DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  roles_id INTEGER,
  manager_id INTEGER,
   CONSTRAINT fk_roles_id
       FOREIGN KEY (roles_id)
       REFERENCES roles (id)
       ON DELETE SET NULL,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE department (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(20) NOT NULL
);

CREATE TABLE roles (
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(20) NOT NULL,
 salary DECIMAL NOT NULL,
 department_id INTEGER NOT NULL,
 CONSTRAINT fk_department
       FOREIGN KEY (department_id)
       REFERENCES department (id)
       ON DELETE CASCADE
);
