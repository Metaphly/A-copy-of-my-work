CREATE TABLE users
(
    user_id int NOT NULL AUTO_INCREMENT,
    email VARCHAR(20),
    password VARCHAR(20),
    PRIMARY KEY (user_id)
);

CREATE TABLE events
(
    event_id int NOT NULL AUTO_INCREMENT,
    location VARCHAR(60),
    start_time VARCHAR(60),
    end_time VARCHAR(60),
    descirption VARCHAR(400),
    creator int,
    PRIMARY KEY (event_id),
    FOREIGN KEY (creator) REFERENCES users(user_id)
);

CREATE TABLE user_events
(
    id int NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(10),
    event_id VARCHAR(30),
    PRIMARY KEY (id,user_id,event_code),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)

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