import express from 'express';
import { app as usersRouter } from '../server/users.js';

export const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/users", usersRouter);

const PORT = 3305;
app.listen(PORT, () => {
    console.log("Server is running on port 3305");
});
