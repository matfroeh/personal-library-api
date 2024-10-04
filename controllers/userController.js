import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/userModel.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

export const createUser = asyncHandler(async (req, res) => {
  const {
    body: { firstName, lastName }
  } = req;
  if (!firstName || !lastName )
    throw new ErrorResponse('First name and last name are required', 400);
  const user = await User.create({ firstName, lastName });
  res.status(201).json(user);
});

export const getUserById = asyncHandler(async (req, res) => {
  const {
    params: { id }
  } = req;
  const user = await User.findById(id);
  if (!user) throw new ErrorResponse('User not found', 404);
  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const {
    body: { firstName, lastName },
    params: { id }
  } = req;
  if (!firstName || !lastName )
    throw new ErrorResponse('First name and last name are required', 400);
  const user = await User.findByIdAndUpdate(id, { firstName, lastName }, { new: true });
  if (!user) throw new ErrorResponse('User not found', 404);
  res.status(200).json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const {
    params: { id }
  } = req;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ErrorResponse('User not found', 404);
  res.status(200).json({ message: 'User deleted' });
});
