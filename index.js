const mysql = require('mysql2');
const consoletable = require('console.table');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'JaHaabcd#36',
      database: 'employees_db;'
    },
    console.log(`Connected to the employees_db database.`)
  );

  const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: "What would you like to do?",
            choices: [ 
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
            ]
        } 
    ])
.then((data) => {
switch (data.selection) {
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
    db.query('select * from department', function (err, results) {
        console.log('\n');
        console.table(results);
        promptUser();
    })
  }

  