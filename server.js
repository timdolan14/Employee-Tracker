const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

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
    }).then((res) => {
        console.log(res)
        let choices = Object.values(res)
        console.log(choices)
        if (choices[0] === 'View all departments') {
            viewAllDepartments();
        }
        if (choices[0] === 'View all roles') {
            viewAllRoles();
        }
        if (choices[0] === 'View all employees') {
            viewAllEmployees();
        }
        if (choices[0] === 'Add a department') {
            addDepartment();
        }
        if (choices[0] === 'Add a role') {
            addRole();
        }
        if (choices[0] === 'Add an employee') {
            addEmployee();
        }
        // if (choices === 'Update an employee role') {
        //     updateEmployeeRole();
        // }
    })
};

questions();


function viewAllDepartments() {
    console.log("test")
    const sql = "SELECT department.id, department.newDepartment FROM department;";
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
        console.log(data)
    })
    questions();
}

function viewAllRoles () {
    console.log("test")
    const sql = "SELECT * FROM roles;";
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
        console.log(data)
    })
    questions();
}

function viewAllEmployees () {
    console.log("test")
    const sql = "SELECT * FROM employees;";
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
        console.log(data)
    })
    questions();
}

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
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'Error'
            });
        } else {
            res.json({
                message: 'Department added to Database',
                data: req.body.newDepartment,
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
            return;
        } else {
            res.json({
                message: 'Role added to Database',
                data: [req.body.role,
                    req.body.salary, req.body.department],
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
            return;
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
//     .then
//     const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//     const params = [req.body.name, req.params.updatedRole]

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             return;
//         } else {
//             res.json({
//                 message: 'Employee added to Database',
//                 data: [req.body.name, req.params.updatedRole],
//                 changes: result.affectedRows
//             });
//         }
//     });
//     questions();
// };