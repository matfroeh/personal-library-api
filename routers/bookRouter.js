import { Router } from "express";
import { getBooks, createBook, getBookById, updateBook, deleteBook } from "../controllers/bookController.js";

const bookRouter = Router();

bookRouter.route("/").get(getBooks).post(createBook);
bookRouter.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

export default bookRouter;