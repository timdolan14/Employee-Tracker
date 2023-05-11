INSERT INTO departments (name)
VALUES ("Engineering"),
       ("Marketing"),
       ("Consulting"),
       ("Finance"),
       ("Science");

INSERT INTO roles (title, salary, department_id)
VALUES ("Head of Marketing", 250, 2),
       ("Head of Engineering", 350, 1),
       ("Consultant", 150, 3),
       ("Head of Finance", 450, 4),
       ("Lead Scientist", 550, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id)
VALUES ("Peter","Parker", 1, NULL,2),
       ("Star","Lord", 2, 1,2), 
       ("Tony","Stark", 3, 2,3),
       ("Bucky","Barnes", 4, NULL,4),
       ("Steve","Rogers", 5, NULL,5);