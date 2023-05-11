const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

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
            'End']
    }).then((res) => {
        let choices = Object.values(res)
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
            default: 
            quit();
        }
    })
};

questions();


function viewAllDepartments() {
    const sql = "SELECT * from departments";
    db.query(sql, function (err, rows) {
        if (err) {
            return;
        }
        console.table(rows)
        questions();
    })
}

function viewAllRoles(res) {
    const sql = "SELECT * from roles";
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows)
        questions();
    });
}

function viewAllEmployees() {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows)
        questions();
    })
}

function addDepartment() {
    inquirer.prompt({
        name: "name",
        type: 'input',
        message: "Add New Department?"
    }).then((data) => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const params = [data.name];
        db.query(sql, params, (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log("Department Added!");
                questions();
            }
        })
    });
};

function addRole() {
    const sql = "SELECT * from departments";
    db.query(sql, function (err, rows) {
        if (err) {
            throw err;
        }
        var deparmentList = rows.map((deparment) => {
            return {
                name: deparment.name,
                value: deparment.id
            }
        })
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
                choices: deparmentList,
                message: "Department?"
            },
        ]).then((data) => {
            console.log(data);
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [data.title,
            data.salary, data.department_id]
            db.query(sql, params, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Role Added!");
                    questions();
                }
            })
        })
    })
};

function addEmployee() {
    const sql = "SELECT * from roles";
    db.query(sql, function (err, rows) {
        if (err) {
            throw err;
        }
        var rolesList = rows.map((roles) => {
            return {
                name: roles.title,
                value: roles.id
            }
        });
        const sql2 = "SELECT * from employees";
        db.query(sql2, function (err, rows) {
            if (err) {
                throw err;
            }
            var emList = rows.map((employees) => {
                return {
                    name: employees.first_name + " " + employees.last_name,
                    value: employees.id
                }
            });
            inquirer.prompt([
                {
                    name: "first_name",
                    type: 'input',
                    message: "First Name?"
                },
                {
                    name: "last_name",
                    type: 'input',
                    message: "Last Name?"
                },
                {
                    name: "role_id",
                    type: 'list',
                    choices: rolesList,
                    message: "Role?"
                },
                {
                    name: "manager_id",
                    type: 'list',
                    choices: emList,
                    message: "Manager?"
                },
            ]).then((data) => {
                const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                const params = [data.first_name, data.last_name,
                data.role_id, data.manager_id]

                db.query(sql, params, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table("Employee Added!");
                        questions();
                    }
                })
            })
        })
    })
};


function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "first_name",
            type: 'input',
            message: "First name of Employee?"
        },
        {
            name: "last_name",
            type: 'input',
            message: "Last name of Employee?"
        },
        {
            name: "role_id",
            type: 'input',
            message: "What would you like to update this to?"
        },
    ])
        .then
    const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
    const params = [data.first_name, data.last_name, data.role_id]
    console.log(data)
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.table({
                message: 'Employee updated in Database',
                data: [data.name, data.updatedRole],
                changes: result.affectedRows
            });
        }
    });
    questions();
};

function quit () {
    console.log("End");
    process.exit();
};
