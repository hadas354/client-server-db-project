import { pool } from "../db/run.js";
import express from 'express';

export const app = express.Router(); // Exporting app as Router

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
    const userID = req.query.userID ?? null;
    const password = req.query.password ?? null;

    // Check if any query parameters are provided
    if (userID !== null || password !== null) {
        // Construct the SQL query dynamically based on provided query parameters
        let sqlQuery = "SELECT * FROM passwords WHERE";
        let conditions = [];

        if (userID !== null) conditions.push(`userId = ${userID}`);
        if (password !== null) conditions.push(`password = '${password}'`);

        sqlQuery += " " + conditions.join(" AND ");
        console.log(sqlQuery);
        // Execute the constructed query
        pool.query(sqlQuery)
            .then((result) => {
                // Send the result back to the client
                res.json(result[0]); // Assuming the result is in JSON format
            })
            .catch((err) => {
                // Handle the error, for example:
                console.error("Error executing query:", err);
                res.status(500).send("Internal Server Error");
            })
    } else {
        // If no query parameters are provided, return all passwords
        pool.query("SELECT * FROM passwords")
            .then((result) => {
                // Send the result back to the client
                res.json(result[0]); // Assuming the result is in JSON format
            })
            .catch((err) => {
                // Handle the error, for example:
                console.error("Error executing query:", err);
                res.status(500).send("Internal Server Error");
            })
    }
});

app.get("/:id", (req, res) => {
    const id = req.params.id;
    pool.query(`SELECT * FROM passwords WHERE id = ${id}`)
        .then((result) => {
            if (result[0].length === 0) {
                // If no Password found with the provided ID, return a 404 Not Found response
                res.status(404).send("Password not found");
            } else {
                // Send the found user back to the client
                res.json(result[0]); // Assuming the result is in JSON format
            }
        })
        .catch((err) => {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        })
});

//post//
app.post("/", (req, res) => {
    const { userId, password } = req.body;
    pool.query(
        `INSERT INTO passwords (userId, password) VALUES (${userId}, '${password}')`)
        .then((result) => {
            res.status(201).send("Password created successfully");
        })
        .catch((err) => {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        })
});

//put//
app.put("/:id", (req, res) => {
    // console.log("put function");
    const id = req.params.id;
    const { userId, password} = req.body;
    pool.query(
        `UPDATE passwords SET userId = ${userId}, password = '${password}' WHERE id = ${id}`)
        .then((result) => {
            res.status(200).send("Password updated successfully");
        })
        .catch((err) => {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        })
});

//delete//
app.delete("/:id", (req, res) => {
    const id = req.params.id;
    
    // Query to check if the Password exists
    pool.query(`SELECT * FROM passwords WHERE id = ${id}`)
        .then((result) => {
            if (result[0].length === 0) {
                // If Password doesn't exist, send appropriate response
                return res.status(404).send("Password not found");
            }
            // If Password exists, proceed with deletion
            pool.query(`DELETE FROM passwords WHERE id = ${id}`)
                .then(() => {
                    // Send success response
                    res.status(200).send("Password deleted successfully");
                })
                .catch((err) => {
                    // Handle deletion error
                    console.error("Error deleting Password:", err);
                    res.status(500).send("Internal Server Error");
                });
        })
        .catch((err) => {
            // Handle the error from the initial query
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        });
});
