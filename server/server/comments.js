import { pool } from "../db/run";
import { app } from "./run";

app.get("/comments", (req, res) => {
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
        // If no query parameters are provided, return all comments
        pool.query("SELECT * FROM comments", (err, result) => {
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

app.get("/comments/:id", (req, res) => {
    const id = req.params.id;
    pool.query(`SELECT * FROM comments WHERE id = ${id}`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.rows.length === 0) {
                // If no comment found with the provided ID, return a 404 Not Found response
                res.status(404).send("Comment not found");
            } else {
                // Send the found user back to the client
                res.json(result.rows[0]); // Assuming the result is in JSON format
            }
        }
    });
});

//post//
app.post("/comments", (req, res) => {
    const { postId, name, email, body } = req.body;

    pool.query(`INSERT INTO comments (postId, name, email, body) VALUES (${postId}, '${name}', '${email}', '${body}')`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            // Send the result back to the client
            res.status(201).send("Comment added successfully");
        }
    });
});

//put//
app.put("/comments/:id", (req, res) => {
    const id = req.params.id;
    const { postId, name, email, body } = req.body;

    pool.query(`UPDATE comments SET postId = ${postId}, name = '${name}', email = '${email}', body = '${body}' WHERE id = ${id}`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            // Send the result back to the client
            res.status(200).send("Comment updated successfully");
        }
    });
});

//delete//
app.delete("/comments/:id", (req, res) => {
    const id = req.params.id;
    pool.query(`DELETE FROM comments WHERE id = ${id}`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            // Send the result back to the client
            res.status(200).send("Comment deleted successfully");
        }
    });
});