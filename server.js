const express = require('express');
const { default: inquirer } = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

const questions = () => {
    inquirer.prompt({
        name: "Where would you like to go?",
        type: 'list',
        choices: ['View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role']
    }).then((choices) => {
        if (choices === 'View all departments') {
            viewAllDepartments();
        }
        if (choices === 'View all roles') {
            viewAllRoles();
        }
        if (choices === 'View all employees') {
            viewAllEmployees();
        }
        if (choices === 'Add a department') {
            addDepartment();
        }
        if (choices === 'Add a role') {
            addRole();
        }
        if (choices === 'Add an employee') {
            addEmployee();
        }
        if (choices === 'Update an employee role') {
            updateEmployeeRole();
        }
    })
};

function viewAllDepartments() {
    app.get('/api/allDepartments', (req, res) => {
        const sql = `SELECT * from departments`;

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
}

function viewAllRoles() {
    app.get('/api/allRoles', (req, res) => {
        const sql = `SELECT * from roles`;

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
}

function viewAllEmployees() {
    app.get('/api/allEmployees', (req, res) => {
        const sql = `SELECT * from roles`;

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
}