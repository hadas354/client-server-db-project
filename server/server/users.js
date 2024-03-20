import { app } from "./run";
import { pool } from "../db/run";

app.get("/users", (req, res) => {
    pool.query("select * users", (err, result) => {
        if (err) {
            // Handle the error, for example:
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            // Send the result back to the client, for example:
            res.json(result.rows); // Assuming the result is in JSON format
        }
    });
})