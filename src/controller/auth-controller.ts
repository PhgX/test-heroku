import { Request, Response } from "express";
import { User } from "../schema/user.model";
import Validate from "./validate-signUp"
import  bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const SECRET_KEY = '379999';
class AuthenController {
    showHomepage = async (req: Request, res: Response) => {
        res.render('products/home');
    }

    showSignUp = async (req: Request, res: Response) => {
        res.render('auth/signUp');
    }

    signUp = async (req: Request, res: Response) => {
        try {
            let userSignUp = req.body;
            let checkedInfo = new User(req.body);
            console.log(userSignUp);
            let username = userSignUp.username;
            let password = userSignUp.password;
            let repassword = userSignUp.re_password;
            let email = userSignUp.email;
            let phone = userSignUp.phone;
            if (await Validate.ValidateUserName(username) &&
                Validate.ValidatePassword(password, repassword) &&
                Validate.passwordMatch(password, repassword) &&
                Validate.ValidateEmail(email) &&
                await Validate.checkEmail(email) &&
                Validate.ValidatePhone(phone)) {
                checkedInfo.password = await bcrypt.hash(userSignUp.password, 10);
                await checkedInfo.save();
                console.log('Sign Up Success');
                res.status(201).json(userSignUp);
            } else if (await Validate.ValidateUserName(username) == false) {
                console.log('Account already exists');
            } else if (Validate.ValidatePassword(password, repassword) == false) {
                console.log('Wrong password');
            } else if (Validate.passwordMatch(password, repassword) == false) {
                console.log('Wrong password confirmation');
            } else if (Validate.ValidateEmail(email) == false) {
                console.log('Wrong email format')
            } else if (await Validate.checkEmail(email) == false) {
                console.log('Email already used')
            } else if (Validate.ValidatePhone(phone) == false) {
                console.log('Please enter your phone number in 10 digits')
            }
        } catch (err) {
            console.log('signUp err: ', err)
        }

    }

    showLoginForm = async (req: Request, res: Response) => {
        res.render('auth/login');
    }

    login = async (req: Request, res: Response) => {
        try {
            let user = req.body;
            let userInfo = await User.findOne({ username: user.username });
            let comparePassword = await bcrypt.compare(user.password, userInfo.password);
            console.log('userInfo', userInfo.password);
            if (userInfo) {
                if (comparePassword) {
                    let payload = {
                        username : userInfo.username
                    }
                    let token = jwt.sign(payload, SECRET_KEY, {
                        expiresIn: 360000
                    });
                    res.status(200).json({
                        token: token
                    });
                    console.log('You are in')
                } else {
                    res.status(401).json({
                        message: 'Password is wrong'
                    })
                    console.log('Wrong password')
                }
            } else {
                res.status(404).json({
                    message: 'Account is not exist'
                })
                console.log('Account is not exist')
            }
        } catch (err) {
            console.log('login err: ', err)
        }

    }
}

export default new AuthenController();