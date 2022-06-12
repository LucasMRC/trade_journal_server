import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserService } from '../service/user.service';


export const getUser = async (req: Request, res: Response, _next?: CallableFunction) => {
    const { username } = req.params;
    const userService = container.resolve(UserService);
    const user = await userService.getUserByUsername(username);
    res.send(user);
};

export const signUp = async (req: Request, res: Response, _next?: CallableFunction) => {
    const { username } = req.params;
    const userService = container.resolve(UserService);
    const user = await userService.handleSignIn(username);
    res.send(user);
};

export const loginUser = async (req: Request, res: Response, _next?: CallableFunction) => {
    const { username } = req.params;
    const userService = container.resolve(UserService);
    const user = await userService.handleLoginUser(username);
    res.send(user);
};