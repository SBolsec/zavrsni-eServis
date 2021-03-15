import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';
import { config } from '../config/constants';
import UserController from '../controllers/user.controller';

const isAuth = (roles: number[]) => async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];

    if (!authorization) {
        return res.status(403).send("not authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload:any = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

        // autorizacija korisnika
        const userController = new UserController();
        const user = await userController.getUserById(payload.userId);
        if (!user) return res.sendStatus(403);

        // ima li korisnik potrebnu ulogu
        if (!roles.includes(user.roleId)) {
            return res.status(403).send("Nemate ovlasti");
        }

        // res.payload = payload;
    } catch (err) {
        console.log(err);
        return res.status(403).send("not authenticated");
    }

    return next();
};

export default isAuth;