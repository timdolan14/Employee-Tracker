DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    newDepartment VARCHAR(255),
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    role VARCHAR(255),
    salary INT NOT NULL,
    department VARCHAR(255)
);

CREATE TABLE employees (
   INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(255),
    manager VARCHAR(255)
);