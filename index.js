const mysql = require('mysql2');
const consoletable = require('console.table');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'JaHaabcd#36',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'InitialSelection',
            message: "What would you like to do?",
            choices: [ 
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employees role',
                'Delete an Employee'
            ]
        } 
    ])
.then((data) => {
    console.log(data)
switch (data.InitialSelection) {

    case 'View all departments':
    viewAllDepartments();
    break;

    case 'View all roles':
    viewAllRoles();
    break;

    case 'View all employees':
    viewAllEmployees();
    break;
    
    case 'Add a department':
    addADepartment();
    break;
    
    case 'Add a role':
    addARole();
    break;
    
    case 'Add an employee':
    addAnEmployee();
    break;
    
    case 'Update an employee role':
    updateEmployeeRole();
    break;    

    case 'Delete an Employee':
    deleteEmployee();
    break;
}
})
};

  promptUser();

  const viewAllDepartments = () => {
    db.query('select * from department', function (err, results) {
        console.log('\n');
        console.table(results);
        promptUser();
    })
  }

  const viewAllRoles = () => {
    db.query('select * from role', function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
  }

  const viewAllEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name, role.salary, CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager FROM employee 
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                ORDER By employee.id`, function (err, results) {   
                    console.log(`\n`);
        console.table(results);
        promptUser();
    })
  }

  function addADepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer) {
                db.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                db.query(query, function(err, res) {
                if(err)throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                promptUser();
                })
            })
};

function addARole() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
            db.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                });
            var query = 'SELECT * FROM role';
            db.query(query, function(err, res) {
            if(err)throw err;
            console.log('Your role has been added!');
            console.table('All Roles:', res);
            promptUser();
            })

        })
    })
};

   

function addAnEmployee() {
    db.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input', 
                    message: "What is the employee's first name? ",
                },
                {
                    name: 'last_name',
                    type: 'input', 
                    message: "What is the employee's last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input', 
                    message: "What is the employee's manager's ID? "
                },
                {
                    name: 'role', 
                    type: 'list',
                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "What is this employee's role? "
                }
                ]).then(function (answer) {
                    let role_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            role_id = res[a].id;
                            console.log(role_id)
                        }                  
                    }  
                    db.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            manager_id: answer.manager_id,
                            role_id: role_id,
                        });
                    var query = 'SELECT * FROM employee';
                    db.query(query, function(err, res) {
                    if(err)throw err;
                    console.log('Your employee has been added!');
                    console.table('All Employees:', res);
                    promptUser();
                    })
                })
        })
};
            

function deleteEmployee() {
    db.query('SELECT * FROM employee', function (err, res) {
        console.log(res)
        const choices = res.map(({id,first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type:"list",
                    name: 'employeeid',
                    message:"Please choose the employee that you want to remove",
                    choices

                }
            ]).then(function (answer) {
                console.log(answer)
                db.query('DELETE FROM employee WHERE id =?', [answer.employeeid], function (err, res) {
                    if (err) throw err;
                    
                    var query = 'SELECT * FROM employee';
                    db.query(query, function(err, res) {
                    if (err) throw err;
                    console.log("The selected employee has been removed.");
                    console.table('All Employees:', res);
                promptUser();
                } );
            })
            })
            })
        };

