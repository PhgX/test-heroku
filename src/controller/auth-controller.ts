import { Request, Response } from "express";
import { User } from "../schema/user.model";
import Validate from "./validate-signUp"


class AuthenController {

    showSignUp = async (req: Request, res: Response) => {
        res.render('auth/signUp');
    }

    signUp = async (req: Request, res: Response) => {
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
        await Validate.checkEmail(email)&& 
        Validate.ValidatePhone(phone)) {
            await checkedInfo.save();
            console.log('Sign Up Success');
        } else if (await Validate.ValidateUserName(username) == false) {
            console.log('Account already exists');
        } else if (Validate.ValidatePassword(password, repassword) == false) {
            console.log('Wrong password');
        } else if (Validate.passwordMatch(password, repassword) == false) {
            console.log('Wrong password confirmation');
        } else if (Validate.ValidateEmail(email) == false) {
            console.log('Wrong email format')
        } else if(await Validate.checkEmail(email) == false) {
            console.log('Email already used')
        } else if (Validate.ValidatePhone(phone)== false) {
            console.log('Please enter your phone number in 10 digits')
        }
    }

    showHomepage = async (req: Request, res: Response) => {
        res.render('products/home');
    }

    showLoginForm = async (req: Request, res: Response) => {
        res.render('auth/login');
    }

    login = async (req: Request, res: Response) => {
        try {
             let user = req.body;
        // console.log(user);
        let loginUserName = user.username;
        // console.log(loginUserName);
        let loginPassword = user.password;
        let checkUser = await User.findOne({ username: loginUserName });
        // console.log('checkUser = ' + checkUser);
        if (checkUser) {
            if (loginPassword == checkUser.password) {
                console.log('You are in')
            } else {
                console.log('Wrong password')
            }
        } else {
            console.log('Account is not exist')
        }
        } catch (err) {
            console.log('login err: ', err)
        }
       
    }
}

export default new AuthenController();