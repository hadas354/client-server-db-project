import { app } from "./run";
import { pool } from "../db/run";

app.get("/users", (req, res) => {
    const id = req.query.id ?? null;
    const name = req.query.name ?? null;
    const username = req.query.username ?? null;
    const email = req.query.email ?? null;
    const city = req.query.city ?? null;
    const phone = req.query.phone ?? null;
    const website = req.query.website ?? null;
    const companyName = req.query.companyName ?? null;

    // Check if any query parameters are provided
    if (id !== null || name !== null || username !== null || email !== null
        || city !== null || phone !== null || website !== null || companyName !== null) {
        // Construct the SQL query dynamically based on provided query parameters
        let sqlQuery = "SELECT * FROM users WHERE";
        let conditions = [];

        if (id !== null) conditions.push(`id = ${id}`);
        if (name !== null) conditions.push(`name = '${name}'`);
        if (username !== null) conditions.push(`username = '${username}'`);
        if (email !== null) conditions.push(`email = '${email}'`);
        if (city !== null) conditions.push(`city = '${city}'`);
        if (phone !== null) conditions.push(`phone = '${phone}'`);
        if (website !== null) conditions.push(`website = '${website}'`);
        if (companyName !== null) conditions.push(`company_name = '${companyName}'`);

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
        // If no query parameters are provided, return all users
        pool.query("SELECT * FROM users", (err, result) => {
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

//show only one user
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    pool.query(`SELECT * FROM users WHERE id = ${userId}`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.rows.length === 0) {
                // If no user found with the provided ID, return a 404 Not Found response
                res.status(404).send("User not found");
            } else {
                // Send the found user back to the client
                res.json(result.rows[0]); // Assuming the result is in JSON format
            }
        }
    });
});
