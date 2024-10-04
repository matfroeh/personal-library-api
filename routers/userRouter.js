import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController.js';
import { addBookToReadingList, getReadingList } from '../controllers/readingListController.js';
import { get } from 'mongoose';
const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

userRouter.route('/:id/readinglist').get(getReadingList).post(addBookToReadingList);
// userRouter.route('/:id/readinglist/:bookId').get().put().delete();


export default userRouter;