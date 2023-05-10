INSERT INTO roles (title, salary, department_id)
VALUES ("Head of Marketing", 250, "1"),
       ("Head of Engineering", 350, "2"),
       ("Consultant", 150, "3"),
       ("Head of Finance", 450, "4"),
       ("Lead Scientist", 550, "5");

INSERT INTO departments (name)
VALUES ("Engineering"),
       ("Marketing"),
       ("Consulting"),
       ("Finance"),
       ("Science");

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Peter","Parker", 1, 10),
       ("Star","Lord", 2, 11), 
       ("Tony","Stark", 3, 12),
       ("Bucky","Barnes", 4, 13),
       ("Steve","Rogers", 5, 14);