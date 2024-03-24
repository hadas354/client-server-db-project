import { pool } from "../db/run.js";
import express from 'express';

export const app = express.Router(); // Exporting app as Router

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
    const userId = req.query.userId ?? null;
    const title = req.query.title ?? null;
    const body = req.query.body ?? null;

    // Check if any query parameters are provided
    if (userId !== null || title !== null || body !== null) {
        // Construct the SQL query dynamically based on provided query parameters
        let sqlQuery = "SELECT * FROM posts WHERE";
        let conditions = [];

        if (userId !== null) conditions.push(`userId = ${userId}`);
        if (title !== null) conditions.push(`title = '${title}'`);
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
        // If no query parameters are provided, return all posts
        pool.query("SELECT * FROM posts")
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
    pool.query(`SELECT * FROM posts WHERE id = ${id}`)
        .then((result) => {
            if (result[0].length === 0) {
                // If no post found with the provided ID, return a 404 Not Found response
                res.status(404).send("Post not found");
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
    const { userId, title, body } = req.body;

    // Execute the query
    pool.query(`INSERT INTO posts (userId, title, body) VALUES ('${userId}', '${title}', '${body}')`)
        .then((result) => {
            // Send the created post back to the client
            res.status(201).send("Post created successfully"); // Assuming the result is in JSON format
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

    const {userId, title, body} = req.body;

    // Execute the query
    pool.query(`UPDATE posts SET userId = '${userId}', title = '${title}', body = '${body}' WHERE id = '${id}'`)
        .then((result) => {
            // Send the result back to the client
            res.status(200).send("Post updated successfully");
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
    
    // Query to check if the post exists
    pool.query(`SELECT * FROM posts WHERE id = ${id}`)
        .then((result) => {
            if (result[0].length === 0) {
                // If post doesn't exist, send appropriate response
                return res.status(404).send("Post not found");
            }
            // If post exists, proceed with deletion
            pool.query(`DELETE FROM posts WHERE id = ${id}`)
                .then(() => {
                    // Send success response
                    res.status(200).send("Post deleted successfully");
                })
                .catch((err) => {
                    // Handle deletion error
                    console.error("Error deleting post:", err);
                    res.status(500).send("Internal Server Error");
                });
        })
        .catch((err) => {
            // Handle the error from the initial query
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        });
});
