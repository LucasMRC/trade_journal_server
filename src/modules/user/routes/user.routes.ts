
import { AuthGuard } from '@src/middlewares';
import { Router } from 'express';
import {
    getUser,
    register,
    loginUser,
    logoutUser
} from '../controller/user.controller';

const UserRoutes = Router();

UserRoutes.get('/:username', getUser);

UserRoutes.post('/register', register);

UserRoutes.post('/login', AuthGuard, loginUser);

UserRoutes.post('/logout', AuthGuard, logoutUser);

export { UserRoutes };
