import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import {
    UserService,
    assertIsUserDto,
    assertIsUserLoginDto,
    assertIsTokenDto
} from '@modules/user';

// Errors
import { ObjectNotValidError } from '@utils/errors';

export const getUser = async (req: Request, res: Response, next: CallableFunction) => {
    const { id } = req.params;
    const userService = container.resolve(UserService);

    try {
        const id_as_number = Number(id);
        if (!id_as_number) throw new ObjectNotValidError('Trade id is not a valid number.');

        const user = await userService.getUser(id_as_number);
        res.send(user);
    } catch (error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: CallableFunction) => {
    const user_dto = req.body;
    const userService = container.resolve(UserService);

    try {
        assertIsUserDto(user_dto);
        const user = await userService.handleRegister(user_dto);
        res.send(user);
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: CallableFunction) => {
    const user_dto = req.body;
    const userService = container.resolve(UserService);

    try {
        assertIsUserLoginDto(user_dto);
        const { access_token, expires_in } = await userService.handleLoginUser(user_dto);
        res.setHeader('Authorization', access_token)
            .status(200)
            .send({ expires_in });
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req: Request, res: Response, next: CallableFunction) => {
    const token_dto = req.body;
    const userService = container.resolve(UserService);

    try {
        assertIsTokenDto(token_dto);
        await userService.handleLogoutUser(token_dto);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
};