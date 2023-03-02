import { Router } from 'express'

import userRouter from './UserRouter';
import todoRouter from './ToDosRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/todo', todoRouter);

export default router;