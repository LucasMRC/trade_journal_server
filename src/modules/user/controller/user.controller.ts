import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserService } from '../service/user.service';
import { UserDTO, TokenDTO, UserLoginDto } from '@modules/user';


export const getUser = async (req: Request, res: Response, next: CallableFunction) => {
    const { id } = req.params;
    const userService = container.resolve(UserService);
    try {
        const user = await userService.getUser(Number(id));
        res.send(user);
    } catch (error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: CallableFunction) => {
    const user_dto = req.body as UserDTO;
    const userService = container.resolve(UserService);
    try {
        const user = await userService.handleRegister(user_dto);
        res.send(user);
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: CallableFunction) => {
    const user_dto = req.body as UserLoginDto;
    const userService = container.resolve(UserService);
    try {
        const { access_token, expires_in } = await userService.handleLoginUser(user_dto);
        res.setHeader('Authorization', access_token)
            .status(200)
            .send({ expires_in });
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req: Request, res: Response, next: CallableFunction) => {
    const token_dto = req.body as TokenDTO;
    const userService = container.resolve(UserService);
    try {
        await userService.handleLogoutUser(token_dto);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
};