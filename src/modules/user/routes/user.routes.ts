
import { Router } from 'express';
import {
    getUser,
    signUp,
    loginUser
} from '../controller/user.controller';

const UserRoutes = Router();

UserRoutes.get('/:username', getUser);

UserRoutes.post('/sign-up', signUp);

UserRoutes.post('/login', loginUser);

export { UserRoutes };
