import { app } from "./run";
import { pool } from "../db/run";

app.get("/posts", (req, res) => {
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
        // If no query parameters are provided, return all posts
        pool.query("SELECT * FROM posts", (err, result) => {
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

app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    pool.query(`SELECT * FROM posts WHERE id = ${id}`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.rows.length === 0) {
                // If no post found with the provided ID, return a 404 Not Found response
                res.status(404).send("Post not found");
            } else {
                // Send the found user back to the client
                res.json(result.rows[0]); // Assuming the result is in JSON format
            }
        }
    });
});

//post//
app.post("/posts", (req, res) => {
    const userId = req.body.userId;
    const title = req.body.title;
    const body = req.body.body;

    // Construct the SQL query
    const sqlQuery = "INSERT INTO posts (userId, title, body) VALUES ($1, $2, $3) RETURNING *";
    const values = [userId, title, body];

    // Execute the query
    pool.query(sqlQuery, values, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            // Send the created post back to the client
            res.status(201).json(result.rows[0]); // Assuming the result is in JSON format
        }
    });
});

//put//
app.put("/posts/:id", (req, res) => {
    const id = req.params.id;
    const userId = req.body.userId;
    const title = req.body.title;
    const body = req.body.body;

    // Construct the SQL query
    const sqlQuery = "UPDATE posts SET userId = $1, title = $2, body = $3 WHERE id = $4 RETURNING *";
    const values = [userId, title, body, id];

    // Execute the query
    pool.query(sqlQuery, values, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.rows.length === 0) {
                // If no post found with the provided ID, return a 404 Not Found response
                res.status(404).send("Post not found");
            } else {
                // Send the updated post back to the client
                res.json(result.rows[0]); // Assuming the result is in JSON format
            }
        }
    });
});

//delete//
app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    pool.query(`DELETE FROM posts WHERE id = ${id}`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.rowCount === 0) {
                // If no post found with the provided ID, return a 404 Not Found response
                res.status(404).send("Post not found");
            } else {
                // Send a success response
                res.status(204).send("Post deleted successfully");
            }
        }
    });
});