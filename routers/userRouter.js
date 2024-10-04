import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController.js';
import { addBookToReadingList, getReadingList, deleteBookFromReadingList } from '../controllers/readingListController.js';
const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

userRouter.route('/:id/readinglist').get(getReadingList).post(addBookToReadingList);
userRouter.route('/:id/readinglist/:bookId').get().put().delete(deleteBookFromReadingList);


export default userRouter;