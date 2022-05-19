SELECT (user,title) FROM posts;

id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(63),
    email VARCHAR(127),
    password VARCHAR(255),
    phone VARCHAR(20),
    last_login DATETIME,
    login_ip CHAR(15),
    PRIMARY KEY (id)

INSERT INTO users (username,email,password,phone) VALUES('hello','hello@example.example','hello','0400000000');

INSERT INTO posts (user,title,content,timestamp,views) VALUES(?,?,?,CURRENT_TIMESTAMP(),1);
INSERT INTO posts (user,title,content,timestamp,views) VALUES(1,'my first post','testing',CURRENT_TIMESTAMP(),1);

SELECT (id,user,title,content AS desc,timestamp,views) FROM posts;