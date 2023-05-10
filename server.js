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

function questions() {
    inquirer.prompt({
        name: "Choose",
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
        switch (choices[0]) {
            case 'View all departments':
                viewAllDepartments();;
                break;
            case 'View all roles':
                viewAllRoles();;
                break;
            case 'View all employees':
                viewAllEmployees();;
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
        }
    })
};

questions();


function viewAllDepartments() {
    console.log("test")
    const sql = "SELECT department.id, department.name FROM department;";
    db.query(sql, function (err, rows) {
        if (err) {
            return;
        }
        console.log({
            message: 'success',
            data: rows
        })
    })
    questions();
}

function viewAllRoles(res) {
    console.log("test")
    const sql = "SELECT title, salary, department_id FROM roles";
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.log({
            message: 'success',
            data: rows
        });
    });
    questions();
}

function viewAllEmployees() {
    console.log("test")
    const sql = "SELECT * FROM employees;";
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.log({
            message: 'success',
            data: rows
        })
    })
    questions();
}

function addDepartment() {
    inquirer.prompt({
        name: "name",
        type: 'input',
        message: "Add New Department?"
    }).then ((data) => {
        const sql = `INSERT INTO departments (name) VALUES ?`;
        const params = [data.name];
        db.query(sql, params, (err, result) => {
            if (err) {
                return;
            } else if (!result.affectedRows) {
                console.log(error);
            } else {
                console.log({
                    message: 'Department added to Database',
                    data: data.name,
                    changes: result.affectedRows
                });
            }
        })
    });
    questions();
};

function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: 'input',
            message: "Title?"
        },
        {
            name: "salary",
            type: 'input',
            message: "Salary?"
        },
        {
            name: "department_id",
            type: 'list',
            choices: ['Engineering', 'Marketing', 'Consulting', 'Finance', 'Science'],
            message: "Department?"
        },
    ]).then((data) => {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES ?`;
        const params = [data.title,
            data.salary, data.department_id]
        db.query(sql, params, (err, result) => {
            if (err) {
                return;
            } else {
                console.log({
                    message: 'Role added to Database',
                    data:[data.title,
                        data.salary, data.department_id]
                });
            }
        })
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
            name: "role_id",
            type: 'list',
            choices: ['Head of Marketing', 'Head of Engineering', 'Consultant',
                'Head of Finance', 'Lead Scientist'],
            message: "Role?"
        },
        {
            name: "manager_id",
            type: 'input',
            message: "Manager?"
        },
    ]) .then((data) => {
        const sql = `INSERT INTO roles (first_name, last_name, role, manager) VALUES ?`;
        const params = [data.firstname, data.lastname,
            data.role_id, data.manager_id]
    
        db.query(sql, params, (err, result) => {
            if (err) {
                return;
            } else {
                console.log({
                    message: 'Employee added to Database',
                    data: [data.firstname, data.lastname,
                data.role_id, data.manager_id],
                    changes: result.affectedRows
                });
            }
        });
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
//     const params = [data.name, data.updatedRole]

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             return;
//         } else {
//             console.log({
//                 message: 'Employee added to Database',
//                 data: [data.name, data.updatedRole],
//                 changes: result.affectedRows
//             });
//         }
//     });
//     questions();
// };