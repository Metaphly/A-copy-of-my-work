CREATE TABLE users
(
    user_id int NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(20) UNIQUE,
    email VARCHAR(70) UNIQUE,
    password VARCHAR(20),
    is_admin BOOLEAN default false,
    PRIMARY KEY (user_id,user_name)
);

CREATE TABLE events
(
    event_id int NOT NULL AUTO_INCREMENT,
    event_name VARCHAR(60),
    location VARCHAR(60),
    start_date VARCHAR(60),
    final_time VARCHAR(60),
    description VARCHAR(400),
    creator int,
    PRIMARY KEY (event_id),
    FOREIGN KEY (creator) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE user_events
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int,
    event_id int,
    free_time TIME,
    CONSTRAINT taked_event UNIQUE(user_id,event_id),
    PRIMARY KEY (id,user_id,event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE

);

INSERT INTO users(user_name,password) VALUES ('james','james');
INSERT INTO users(user_name,password) VALUES ('john','john');
DELETE FROM users WHERE user_name='james';

SELECT * FROM users;

INSERT INTO events(event_name,description,creator,start_date) VALUES ('Hello','Hello',1,'09/98');
INSERT INTO events(event_name,description,creator,start_date) VALUES ('Hello','Hello',1,'07/8');


SELECT * FROM events;

TABLE user_events;
TABLE events;
TABLE user;

