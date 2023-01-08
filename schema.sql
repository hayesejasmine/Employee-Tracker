DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT,
  title VARCHAR(30), 
  salary Decimal,
  department_id INT
);

CREATE TABLE employee (
  id INT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT 
);