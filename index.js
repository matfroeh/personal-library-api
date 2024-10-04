import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import bookRouter from "./routers/bookRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import './db/db.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/books', bookRouter);


app.use('*', (req, res) => res.status(404).json({ error: 'Not Found' }));
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);