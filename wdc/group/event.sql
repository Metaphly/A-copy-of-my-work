CREATE TABLE users
(
    user_id int NOT NULL AUTO_INCREMENT,
    email VARCHAR(20),
    password VARCHAR(20),
    PRIMARY KEY (user_id,email)
);

CREATE TABLE events
(
    event_id int NOT NULL AUTO_INCREMENT,
    event_name(60);
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
    user_id int,
    event_id int,
    PRIMARY KEY (id,user_id,event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE

);

INSERT INTO users(email,password) VALUES ('james@event.com','james');
INSERT INTO users(email,password) VALUES ('john@event.com','john');

INSERT INTO events(email,password) VALUES ('john@event.com','john');
