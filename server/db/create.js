import {pool} from './run.js';

export const drop = async () => {
    await pool.query('DROP TABLE IF EXISTS Comments');
    await pool.query('DROP TABLE IF EXISTS Posts');
    await pool.query('DROP TABLE IF EXISTS Todos');
    await pool.query('DROP TABLE IF EXISTS Passwords');
    await pool.query('DROP TABLE IF EXISTS Users');
}

export const create = async () => {
    // Create the database
    await pool.query('CREATE DATABASE IF NOT EXISTS jsonplaceholderdemo');

    // Switch to the newly created database
    await pool.query('USE jsonplaceholderdemo');

    // Create the Users table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Users(
        id int,
        name varchar(255),
        username varchar(255),
        email varchar(255),
        city varchar(255),
        phone bigint,
        website varchar(255),
        companyName varchar(255),
        PRIMARY KEY (id)
    );
`);

    // Create the Todos table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Todos(
        userID int,
        id int,
        title varchar(255),
        completed BOOLEAN,
        PRIMARY KEY (id),
        FOREIGN KEY (userID) REFERENCES Users(id)
    );
`);

    // Create the Posts table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Posts(
        id int,
        userID int,
        title varchar(255),
        body text,
        PRIMARY KEY (id),
        FOREIGN KEY (userID) REFERENCES Users(id)
    );
`);

    // Create the Comments table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Comments(
        postID int,
        id int,
        name varchar(255),
        body text,
        userID int,
        PRIMARY KEY (id),
        FOREIGN KEY (userID) REFERENCES Users(id),
        FOREIGN KEY (postID) REFERENCES Posts(id)
    );
`);

    // Create the Passwards table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Passwords(
        userID int,
        password varchar(255),
        PRIMARY KEY (userID),
        FOREIGN KEY (userID) REFERENCES Users(id)
    );
`);
};