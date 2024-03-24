import { pool } from "../db/run.js";
import express from 'express';

export const app = express.Router(); // Exporting app as Router

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
    const userId = req.query.userId ?? null;
    const title = req.query.title ?? null;
    const completed = req.query.completed ?? null;

    // Check if any query parameters are provided
    if (userId !== null || title !== null || completed !== null) {
        // Construct the SQL query dynamically based on provided query parameters
        let sqlQuery = "SELECT * FROM todos WHERE";
        let conditions = [];

        if (userId !== null) conditions.push(`userId = ${userId}`);
        if (title !== null) conditions.push(`title = '${title}'`);
        if (completed !== null) conditions.push(`completed = ${completed}`);

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
        // If no query parameters are provided, return all todos
        pool.query("SELECT * FROM todos")
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
    pool.query(`SELECT * FROM todos WHERE id = ${id}`)
        .then((result) => {
            if (result[0].length === 0) {
                // If no todo found with the provided ID, return a 404 Not Found response
                res.status(404).send("Todo not found");
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
    const { userId, title, completed } = req.body;
    pool.query(
        `INSERT INTO todos (userId, title, completed) VALUES (${userId}, '${title}', ${completed})`)
        .then((result) => {
            res.status(201).send("Todo created successfully");
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
    const { userId, title, completed } = req.body;
    pool.query(
        `UPDATE todos SET userId = ${userId}, title = '${title}', completed = ${completed} WHERE id = ${id}`)
        .then((result) => {
            res.status(200).send("Todo updated successfully");
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
    
    // Query to check if the todo exists
    pool.query(`SELECT * FROM todos WHERE id = ${id}`)
        .then((result) => {
            if (result[0].length === 0) {
                // If todo doesn't exist, send appropriate response
                return res.status(404).send("Todo not found");
            }
            // If todo exists, proceed with deletion
            pool.query(`DELETE FROM todos WHERE id = ${id}`)
                .then(() => {
                    // Send success response
                    res.status(200).send("Todo deleted successfully");
                })
                .catch((err) => {
                    // Handle deletion error
                    console.error("Error deleting todo:", err);
                    res.status(500).send("Internal Server Error");
                });
        })
        .catch((err) => {
            // Handle the error from the initial query
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        });
});
