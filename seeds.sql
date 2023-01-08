INSERT INTO department (id, name)
VALUES (001, Human Resources),
       (002, Loan Processing),
       (003, Underwriting),
       (004, Vendor),
       (005, Employment Verification);

INSERT INTO role (id, title, salary, department_id)
VALUES (91, Credit Underwriter, 120,000.00, 003),
       (92, Collateral Underwriter, 110,000.00, 004),
       (93, Loan Specialist, 45,000.00, 002),
       (91, Credit Underwriter, 120,000.00, 003),
       (95, Employee Relations Manager, 67,000.00, 001),
       (96, Benefits Manager, 70,000.00, 001),
       (97, Verification Specialist, 35,000.00, 005);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (882, Anne, Clark, 91, 5),
       (883, Sara, Marshall, 92, 7),
       (884, Tom, Hatters, 97, 9),
       (885, Kate, Beckend, 95, 11),
       (886, Ryan, Phillip, 96, 13),
       (887, Mariah, Holmes, 93, 15),
       (888, Christopher, Hall, 93, 17);