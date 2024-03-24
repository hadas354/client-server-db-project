import { pool } from "../db/run.js";
import express from 'express';

export const app = express.Router(); // Exporting app as Router

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
    const postId = req.query.postId ?? null;
    const name = req.query.name ?? null;
    const email = req.query.email ?? null;
    const body = req.query.body ?? null;

    // Check if any query parameters are provided
    if (postId !== null || name !== null || email !== null || body !== null) {
        // Construct the SQL query dynamically based on provided query parameters
        let sqlQuery = "SELECT * FROM comments WHERE";
        let conditions = [];

        if (postId !== null) conditions.push(`postId = ${postId}`);
        if (name !== null) conditions.push(`name = '${name}'`);
        if (email !== null) conditions.push(`email = '${email}'`);
        if (body !== null) conditions.push(`body = '${body}'`);

        sqlQuery += " " + conditions.join(" AND ");

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
        // If no query parameters are provided, return all comments
        pool.query("SELECT * FROM comments")
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
    pool.query(`SELECT * FROM comments WHERE id = ${id}`)
        .then((result) => {
            if (result[0].length === 0) {
                // If no comment found with the provided ID, return a 404 Not Found response
                res.status(404).send("Comment not found");
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
    const { postId, name, body, userID } = req.body;

    pool.query(`INSERT INTO comments (postId, name, body, userID) VALUES ('${postId}', '${name}', '${body}', '${userID}')`)
        .then((result) => {
            // Send the result back to the client
            res.status(201).send("Comment added successfully");
        })
        .catch((err) => {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        })
});

//put//
app.put("/:id", (req, res) => {
    const id = req.params.id;
    const { postId, name, body, userID } = req.body;

    pool.query(`UPDATE comments SET postId = '${postId}', name = '${name}', userID = '${userID}', body = '${body}' WHERE id = ${id}`)
        .then((result) => {
            // Send the result back to the client
            res.status(200).send("Comment updated successfully");
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
    
    // Query to check if the comment exists
    pool.query(`SELECT * FROM comments WHERE id = ${id}`)
        .then((result) => {
            if (result[0].length === 0) {
                // If comment doesn't exist, send appropriate response
                return res.status(404).send("Comment not found");
            }
            // If comment exists, proceed with deletion
            pool.query(`DELETE FROM comments WHERE id = ${id}`)
                .then(() => {
                    // Send success response
                    res.status(200).send("Comment deleted successfully");
                })
                .catch((err) => {
                    // Handle deletion error
                    console.error("Error deleting comment:", err);
                    res.status(500).send("Internal Server Error");
                });
        })
        .catch((err) => {
            // Handle the error from the initial query
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        });
});
