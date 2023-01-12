INSERT INTO department (ame)
VALUES ('Human Resources'),
       ('Loan Processing'),
       ('Underwriting'),
       ('Vendor'),
       ('Employment Verification');

INSERT INTO role (title, salary, department_id)
VALUES ('Credit Underwriter', 120000, 1),
       ('Collateral Underwriter', 110000, 2),
       ('Loan Specialist', 45000, 3),
       ('Credit Underwriter', 120000, 4),
       ('Employee Relations Manager', 67000, 4),
       ('Benefits Manager', 70000, 5),
       ('Verification Specialist', 35000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Anne', 'Clark', 1, NULL),
       ('Sara', 'Marshall', 2, 1),
       ('Tom', 'Hatters', 3, 1),
       ('Kate', 'Beckend', 4, 1),
       ('Ryan', 'Phillip', 5, 1),
       ('Mariah', 'Holmes', 6, 1),
       ('Christopher', 'Hall', 7,1);