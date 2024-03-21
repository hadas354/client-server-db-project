import { pool } from "../db/run";
import express from 'express';

export const app = express.Router(); // Exporting app as Router

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/todos", (req, res) => {
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
        pool.query(sqlQuery, (err, result) => {
            if (err) {
                // Handle the error, for example:
                console.error("Error executing query:", err);
                res.status(500).send("Internal Server Error");
            } else {
                // Send the result back to the client
                res.json(result.rows); // Assuming the result is in JSON format
            }
        });
    } else {
        // If no query parameters are provided, return all todos
        pool.query("SELECT * FROM todos", (err, result) => {
            if (err) {
                // Handle the error, for example:
                console.error("Error executing query:", err);
                res.status(500).send("Internal Server Error");
            } else {
                // Send the result back to the client
                res.json(result.rows); // Assuming the result is in JSON format
            }
        });
    }
});

app.get("/todos/:id", (req, res) => {
    const id = req.params.id;
    pool.query(`SELECT * FROM todos WHERE id = ${id}`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.rows.length === 0) {
                // If no todo found with the provided ID, return a 404 Not Found response
                res.status(404).send("Todo not found");
            } else {
                // Send the found user back to the client
                res.json(result.rows[0]); // Assuming the result is in JSON format
            }
        }
    });
});

//post//
app.post("/todos", (req, res) => {
    const { userId, title, completed } = req.body;
    pool.query(
        `INSERT INTO todos (userId, title, completed) VALUES (${userId}, '${title}', ${completed})`,
        (err, result) => {
            if (err) {
                // Handle the error, for example:
                console.error("Error executing query:", err);
                res.status(500).send("Internal Server Error");
            } else {
                res.status(201).send("Todo created successfully");
            }
        }
    );
});

//put//
app.put("/todos/:id", (req, res) => {
    const id = req.params.id;
    const { userId, title, completed } = req.body;
    pool.query(
        `UPDATE todos SET userId = ${userId}, title = '${title}', completed = ${completed} WHERE id = ${id}`,
        (err, result) => {
            if (err) {
                // Handle the error, for example:
                console.error("Error executing query:", err);
                res.status(500).send("Internal Server Error");
            } else {
                res.status(200).send("Todo updated successfully");
            }
        }
    );
});

//delete//
app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    pool.query(`DELETE FROM todos WHERE id = ${id}`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send("Todo deleted successfully");
        }
    });
});