CREATE TABLE Students
(
    student_id VARCHAR(10),
    given_name VARCHAR(20),
    family_name VARCHAR(20),
    program VARCHAR(20),
    PRIMARY KEY (student_id)
);

CREATE TABLE Subjects
(
    subject_code VARCHAR(30),
    subject VARCHAR(60),
    faculty VARCHAR(60),
    PRIMARY KEY (subject_code)
);

CREATE TABLE Enrolments
(
    student_id VARCHAR(10),
    subject_code VARCHAR(30),
    mark INT,
    PRIMARY KEY (student_id,subject_code)
);

INSERT INTO Students VALUES ('a1111111','Fang','Li','BE(Hons)(Soft)');
INSERT INTO Students VALUES ('a1111112','Jane','Brown','BE(Hons)(Soft)');
INSERT INTO Students VALUES ('a1111113','Bob','Smith','BCompSc');
INSERT INTO Students VALUES ('a1111114','Wei','Zhang','BCompSc');

SELECT * FROM Students;

INSERT INTO Subjects VALUES ('COMP SCI 1102','Object Oriented Programming','ECMS');
INSERT INTO Subjects VALUES ('COMP SCI 2207','Web and Database Computing','ECMS');
INSERT INTO Subjects VALUES ('COMP SCI 2000','Computer Systems','ECMS');
INSERT INTO Subjects VALUES ('PHIL 2039','Philosophy of Mind','Arts');

SELECT * FROM Subjects;

INSERT INTO Enrolments VALUES ('a1111111','COMP SCI 1102','62');
INSERT INTO Enrolments VALUES ('a1111111','COMP SCI 2000','80');
INSERT INTO Enrolments VALUES ('a1111112','COMP SCI 1102','55');
INSERT INTO Enrolments VALUES ('a1111112','COMP SCI 2207','80');
INSERT INTO Enrolments VALUES ('a1111113','PHIL 2039','65');
INSERT INTO Enrolments VALUES ('a1111113','COMP SCI 1102','46');
INSERT INTO Enrolments VALUES ('a1111114','COMP SCI 2207','67');
INSERT INTO Enrolments VALUES ('a1111114','COMP SCI 2000','49');

SELECT * FROM Enrolments;