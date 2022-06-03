CREATE TABLE users
(
    user_id int NOT NULL AUTO_INCREMENT,
    email VARCHAR(20) UNIQUE,
    password VARCHAR(20),
    PRIMARY KEY (user_id,email)
);

CREATE TABLE events
(
    event_id int NOT NULL AUTO_INCREMENT,
    event_name VARCHAR(60),
    location VARCHAR(60),
    start_time VARCHAR(60),
    end_time VARCHAR(60),
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
    PRIMARY KEY (id,user_id,event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE

);

INSERT INTO users(email,password) VALUES ('james@event.com','james');
INSERT INTO users(email,password) VALUES ('john@event.com','john');
DELETE FROM users WHERE email='james@event.com';

SELECT * FROM users;

INSERT INTO events(event_name,description,creator) VALUES ('Hello','Hello',1);
INSERT INTO events(event_name,description,creator) VALUES ('Hello','Hello',1);


SELECT * FROM events;

TABLE user_events;
TABLE events;
TABLE user;

