import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Book from "../models/bookModel.js";

export const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});

export const createBook = asyncHandler(async (req, res) => {
  const {
    body: { title, author, publisher, publicationYear, isbn },
  } = req;
  if (!title || !author || !publisher || !publicationYear || !isbn)
    throw new ErrorResponse(
      "Please enter title, author, publisher, publication year, and isbn.",
      400
    );
  const found = await Book.findOne({ isbn });
  if (found)
    throw new ErrorResponse(`Book with ISBN: ${isbn} already exists.`, 400);
  const book = await Book.create({
    title,
    author,
    publisher,
    publicationYear,
    isbn,
  });
  res.status(201).json(book);
});

export const getBookById = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  const book = await Book.findById(id);
  if (!book) throw new ErrorResponse("Book not found", 404);
  res.status(200).json(book);
});

export const updateBook = asyncHandler(async (req, res) => {
  const {
    body: { title, author, publisher, publicationYear, isbn },
    params: { id },
  } = req;
  if (!title || !author || !publisher || !publicationYear || !isbn)
    throw new ErrorResponse(
      "Please enter title, author, publisher, publication year, and isbn.",
      400
    );
  // Check if another entry with the same ISBN already exists in the database
  const foundDuplicateIsbn = await Book.find({ "isbn": isbn, "_id": {"$ne": id} }).countDocuments() > 0; 
  if (foundDuplicateIsbn)
    throw new ErrorResponse(`Book with ISBN: ${isbn} already exists.`, 400);

  const book = await Book.findByIdAndUpdate(
    id,
    { title, author, publisher, publicationYear, isbn },
    { new: true }
  );
  if (!book) throw new ErrorResponse("Book not found", 404);
  res.status(200).json(book);
});

export const deleteBook = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  const book = await Book.findByIdAndDelete(id);
  if (!book) throw new ErrorResponse("Book not found", 404);
  res.status(200).json({ message: "Book deleted" });
});
