import express from 'express';
import cors from 'cors';
import { app as usersRouter } from '../server/users.js';
import {app as postsRouter } from '../server/posts.js';
import { app as todosRouter } from '../server/todos.js';
import { app as commentsRouter } from '../server/comments.js';
import {app as passwordsRouter} from '../server/passwods.js';

export const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
//make requests from localhost everywhere
app.use(cors({
    origin: '*'
  }));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/todos", todosRouter);
app.use("/comments", commentsRouter);
app.use("/passwords", passwordsRouter);

const PORT = 3305;
app.listen(PORT, () => {
    console.log("Server is running on port 3305");
});
