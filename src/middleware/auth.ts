
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../controller/auth-controller';

export const auth = (req, res, next : NextFunction) => {
    let authorization = req.headers.authorization;
    if (authorization) {
        let accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            res.status(401).json({
                message: 'You are anonymous'
            });
        } else {
            jwt.verify(accessToken, SECRET_KEY, (err, data) => {
                if (err) {
                    res.status(401).json({
                        error: err.message,
                        message: 'You are anonymous'
                    });
                } else {
                    req.decoded = data;
                    next();
                }
            });
        }
    } else {
        res.status(401).json({
            message: 'You are anonymous'
        });
    }
}
