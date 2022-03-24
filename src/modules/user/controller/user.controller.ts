import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserService } from '../service/user.service';


export const getUser = async (req: Request, res: Response, _next?: CallableFunction) => {
    const { username } = req.params;
    const userService = container.resolve(UserService);
    const user = await userService.getUserByUserNname(username);
    res.send(user);
};