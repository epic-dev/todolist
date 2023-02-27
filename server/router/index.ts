import { Router } from 'express'

import { UserController } from '../controllers';

import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 16 }),
    UserController.registration,
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);

export default router;