import express from 'express';
import { app as usersRoute } from '../server/users.js';
// import { getUserById } from '../server/users.js';

export const app = express();
//const usersRoute = require('./users');

app.use("/users", usersRoute);
//app.get("/users/:id", getUserById);

try {
    app.listen(3305, () => {
        console.log("Server is running on port 3305");
    });
} catch (error) {
    console.error("Error starting the server:", error);
}
