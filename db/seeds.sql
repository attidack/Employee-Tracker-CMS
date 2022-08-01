INSERT INTO department (name)
VALUES 
('Software'),
('Food'),
('Apparel'),
('Sports');

INSERT INTO roles (title, salary, department_id)
VALUES
('Developer', 125000, 1),
('Server', 45000, 2),
('Designer', 75000, 3),
('Manager', 100000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES 
('Jon', 'bird', 4, NULL),
('Jenna', 'Rogan', 1, 1),
('Tyler', 'Genkins', 2, 1),
('Maddie', 'Day', 3, 1),
('Biggy', 'Smalls', 2, 1);