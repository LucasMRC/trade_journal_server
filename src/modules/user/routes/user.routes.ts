
import { AuthGuard } from '@src/middlewares';
import { Router } from 'express';
import {
    getUser,
    register,
    loginUser,
    logoutUser
} from '../controller/user.controller';

const UserRoutes = Router();

UserRoutes.get('/:id', AuthGuard, getUser);

UserRoutes.post('/register', register);

UserRoutes.post('/login', loginUser);

UserRoutes.post('/logout', AuthGuard, logoutUser);

export { UserRoutes };
