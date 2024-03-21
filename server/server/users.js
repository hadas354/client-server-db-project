
import express from 'express';
import { pool } from "../db/run";
// import { app } from "./run";

// const app = express();
export const router = express.Router();
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
export function getUserById(req, res){
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
};


////////
//post//
////////

app.post("/", (req, res) => {
    const { name, username, email, city, phone, website, companyName } = req.body;
    pool.query(`INSERT INTO users (name, username, email, city, phone, website, company_name) VALUES ('${name}', '${username}', '${email}', '${city}', '${phone}', '${website}', '${companyName}')`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            // Send the result back to the client
            res.status(201).send("User created successfully");
        }
    });
});

//put//
app.put("/:id", (req, res) => {
    const userId = req.params.id;
    const { name, username, email, city, phone, website, companyName } = req.body;
    pool.query(`UPDATE users SET name = '${name}', username = '${username}', email = '${email}', city = '${city}', phone = '${phone}', website = '${website}', company_name = '${companyName}' WHERE id = ${userId}`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            // Send the result back to the client
            res.status(200).send("User updated successfully");
        }
    });
});

//delete//
app.delete("/:id", (req, res) => {
    const userId = req.params.id;
    pool.query(`DELETE FROM users WHERE id = ${userId}`, (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            // Send the result back to the client
            res.status(200).send("User deleted successfully");
        }
    });
});


// const PORT = 3305;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });