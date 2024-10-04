import User from "../models/userModel.js";
import Book from "../models/bookModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getReadingList = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(id);
  const user = await User.findById(id).populate({path: 'readingList'});
  if (!user) throw new ErrorResponse("User not found", 404);
  res.status(201).json(user);
});

export const addBookToReadingList = asyncHandler(async (req, res) => {
  const {
    params: { id },
    body: { _id },
  } = req;
  if (!_id) throw new ErrorResponse("Please enter a book id.", 400);
  const user = await User.findByIdAndUpdate(
    id,
    { $push: { readingList: _id } },
  );
  if (!user) throw new ErrorResponse("User not found", 404);
  await user.populate({path: 'readingList'});
  const updatedUser = await User.findById(id).populate({path: 'readingList'});
  res.status(201).json(updatedUser);
});
