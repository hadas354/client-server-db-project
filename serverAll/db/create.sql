CREATE DATABASE jsonplaceholderdemo;
USE jsonplaceholderdemo;

CREATE TABLE Users(
    id int,
    name varchar(255),
    username varchar(255),
    email varchar(255),
    city varchar(255),
    phone int,
    website varchar(255),
    companyName varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE Todos(
    userID int,
    id int,
    title varchar(255),
    completed BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE Posts(
    id int,
    userID int,
    title varchar(255),
    body text,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE Comments(
    postID int,
    id int,
    name varchar(255),
    body text,
    userID int,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Users(id),
    FOREIGN KEY (postID) REFERENCES Posts(id)
);

CREATE TABLE Passwards(
    userID int,
    passward varchar(255),
    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES Users(id)
);