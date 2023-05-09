const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'employee_db'
//     },
//     console.log(`Connected to the employee_db database.`)
// );

function questions () {
    inquirer.prompt({
        name: "Where would you like to go?",
        type: 'list',
        choices: ['View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
        ]
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
        // if (choices === 'Update an employee role') {
        //     updateEmployeeRole();
        // }
    })
};

questions();



function viewAllDepartments() {
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
    questions();
}

function viewAllRoles() {
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
    questions();
}

function viewAllEmployees() {
    const sql = `SELECT * from employees`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
    questions();
};

function addDepartment() {
    inquirer.prompt({
        name: "newDepartment",
        type: 'input',
        message: "Add New Department?"
    }).then

    const sql = `INSERT INTO departments (newDepartment) VALUES ?`;
    const params = [req.body.newDepartment];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Error'
            });
        } else {
            res.json({
                message: 'Department added to Database',
                data: req.body,
                changes: result.affectedRows
            });
        }
    })
    questions();
};

function addRole() {
    inquirer.prompt([
        {
            name: "role",
            type: 'input',
            message: "Role?"
        },
        {
            name: "salary",
            type: 'input',
            message: "Salary?"
        },
        {
            name: "department",
            type: 'input',
            message: "Department?"
        },
    ])
    .then
    const sql = `INSERT INTO roles (role, salary, departments) VALUES ?`;
    const params = [req.body.role,
    req.body.salary, req.body.department];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Error'
            });
        } else {
            res.json({
                message: 'Role added to Database',
                data: req.body,
                changes: result.affectedRows
            });
        }
    })
    questions();
};

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: 'input',
            message: "First Name?"
        },
        {
            name: "lastName",
            type: 'input',
            message: "Last Name?"
        },
        {
            name: "role",
            type: 'input',
            message: "Role?"
        },
        {
            name: "manager",
            type: 'input',
            message: "Manager?"
        },
     ])
    .then
    const sql = `INSERT INTO roles (first_name, last_name, role, manager) VALUES ?`;
    const params = [req.body.firstame, req.params.lastName,
    req.body.role, req.body.manager];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Error'
            });
        } else {
            res.json({
                message: 'Employee added to Database',
                data: [req.body.firstname, req.params.lastname,
                req.body.role, req.body.manager],
                changes: result.affectedRows
            });
        }
    });
    questions();
};

// function updateEmployeeRole() {
//     inquirer.prompt([
//         {
//             name: "name",
//             type: 'input',
//             message: "Name of Employee?"
//         },
//         {
//             name: "updatedRole",
//             type: 'input',
//             message: "What would you like to update this to?"
//         },
//      ])
//     //.then
//     // const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//     // const params = [req.body.firstame, req.params.lastName,
//     // req.body.role, req.body.manager];

//     // db.query(sql, params, (err, result) => {
//     //     if (err) {
//     //         res.status(400).json({ error: err.message });
//     //     } else if (!result.affectedRows) {
//     //         res.json({
//     //             message: 'Error'
//     //         });
//     //     } else {
//     //         res.json({
//     //             message: 'Employee added to Database',
//     //             data: [req.body.name, req.params.updatedRole]
//     //             changes: result.affectedRows
//     //         });
//     //     }
//     // });
//     questions();
// };