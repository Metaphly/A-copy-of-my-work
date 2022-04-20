CREATE TABLE Students
{
    student_id VARCHAR(10),
    given_name VARCHAR(20),
    family_name VARCHAR(20),
    program VARCHAR(20),
    PRIMARY KEY (student_id)
};

CREATE TABLE Subjects
{
    subject_code VARCHAR(10),
    subject VARCHAR(20),
    faculty VARCHAR(20),
    PRIMARY KEY (subject_code)
};

CREATE TABLE Enrolments
{
    student_id VARCHAR(10),
    subject_code VARCHAR(10),
    mark INT,
    PRIMARY KEY (student_id,subject_code)
};