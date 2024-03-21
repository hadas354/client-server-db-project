import express from 'express';
import { pool } from "../db/run.js";

export const app = express.Router(); // Exporting app as Router

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
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
        pool.query(sqlQuery)
            .then((result) => {
                // Send the result back to the client
                res.json(result.rows); // Assuming the result is in JSON format
            })
            .catch((err) => {
                // Handle the error, for example:
                console.error("Error executing query:", err);
                res.status(500).send("Internal Server Error");
            })
    } else {
        // If no query parameters are provided, return all users
        pool.query("SELECT * FROM users")
            .then((result) => {
                // Check if any users are found
                if (result.length === 0) {
                    return res.status(404).json({ error: "No users found" });
                }

                // Send the result back to the client
                res.status(200).json(result[0]);
            })
            .catch((err) => {
                // Handle the error
                console.error("Error executing query:", err);
                res.status(500).json({ error: "Internal Server Error" });
            });
    }
});

//show only one user
app.get("/:id", (req, res) => {
    const userId = req.params.id;
    pool.query(`SELECT * FROM users WHERE id = ${userId}`)
        .then((result) => {
            if (result[0].length === 0) {
                // If no user found with the provided ID, return a 404 Not Found response
                res.status(404).send("User not found");
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
    console.log(req.body);
    const { name, username, email, city, phone, website, companyName } = req.body;
    pool.query(`INSERT INTO users (name, username, email, city, phone, website, companyName) VALUES ('${name}', '${username}', '${email}', '${city}', '${phone}', '${website}', '${companyName}')`)
        .then((result) => {
            // Send the result back to the client
            res.status(201).send("User created successfully");
        })
        .catch((err) => {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        })
});

//put//
app.put("/:id", (req, res) => {
    const userId = req.params.id;
    const { name, username, email, city, phone, website, companyName } = req.body;
    pool.query(`UPDATE users SET name = '${name}', username = '${username}', email = '${email}', city = '${city}', phone = '${phone}', website = '${website}', companyName = '${companyName}' WHERE id = ${userId}`)
        .then((result) => {
            // Send the result back to the client
            res.status(200).send("User updated successfully");
        })
        .catch((err) => {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        })
});

//delete//
app.delete("/:id", (req, res) => {
    const userId = req.params.id;
    pool.query(`DELETE FROM users WHERE id = ${userId}`)
        .then((result) => {
            // Send the result back to the client
            res.status(200).send("User deleted successfully");
        })
        .catch((err) => {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        })
});

export default app; // Exporting Router instance