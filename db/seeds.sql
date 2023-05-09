INSERT INTO roles (role, salary, departments)
VALUES ("Head of Marketing", 250, "Marketing"),
       ("Head of Engineering", 350, "Engineering"),
       ("Consultant", 150, "Consulting"),
       ("Head of Finance", 450, "Finance"),
       ("Lead Scientist", 550, "Science");

INSERT INTO departments (newDepartment)
VALUES ("Engineering"),
       ("Marketing"),
       ("Consulting"),
       ("Finance"),
       ("Science");

INSERT INTO employees (first_name, last_name, role, manager)
VALUES ("Peter","Parker","Consultant","Aunt May"),
       ("Star","Lord","Head of Marketing","Rocket Racoon"), 
       ("Tony","Stark", "Head of Engineering","Pepper Potts"),
       ("Bucky","Barnes", "Head of Finance","Happy Hogan"),
       ("Steve","Rogers", "Lead Scientist","Peggy Carter");