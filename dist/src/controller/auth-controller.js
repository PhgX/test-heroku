"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = void 0;
const user_model_1 = require("../schema/user.model");
const validate_signUp_1 = __importDefault(require("./validate-signUp"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET_KEY = '379999';
class AuthenController {
    constructor() {
        this.showHomepage = async (req, res) => {
            res.render('products/home');
        };
        this.showSignUp = async (req, res) => {
            res.render('auth/signUp');
        };
        this.signUp = async (req, res) => {
            try {
                let userSignUp = req.body;
                let checkedInfo = new user_model_1.User(req.body);
                console.log(userSignUp);
                let username = userSignUp.username;
                let password = userSignUp.password;
                let repassword = userSignUp.re_password;
                let email = userSignUp.email;
                let phone = userSignUp.phone;
                if (await validate_signUp_1.default.ValidateUserName(username) &&
                    validate_signUp_1.default.ValidatePassword(password, repassword) &&
                    validate_signUp_1.default.passwordMatch(password, repassword) &&
                    validate_signUp_1.default.ValidateEmail(email) &&
                    await validate_signUp_1.default.checkEmail(email) &&
                    validate_signUp_1.default.ValidatePhone(phone)) {
                    checkedInfo.password = await bcrypt_1.default.hash(userSignUp.password, 10);
                    await checkedInfo.save();
                    console.log('Sign Up Success');
                    res.status(201).json(userSignUp);
                }
                else if (await validate_signUp_1.default.ValidateUserName(username) == false) {
                    console.log('Account already exists');
                }
                else if (validate_signUp_1.default.ValidatePassword(password, repassword) == false) {
                    console.log('Wrong password');
                }
                else if (validate_signUp_1.default.passwordMatch(password, repassword) == false) {
                    console.log('Wrong password confirmation');
                }
                else if (validate_signUp_1.default.ValidateEmail(email) == false) {
                    console.log('Wrong email format');
                }
                else if (await validate_signUp_1.default.checkEmail(email) == false) {
                    console.log('Email already used');
                }
                else if (validate_signUp_1.default.ValidatePhone(phone) == false) {
                    console.log('Please enter your phone number in 10 digits');
                }
            }
            catch (err) {
                console.log('signUp err: ', err);
            }
        };
        this.showLoginForm = async (req, res) => {
            res.render('auth/login');
        };
        this.login = async (req, res) => {
            try {
                let user = req.body;
                let userInfo = await user_model_1.User.findOne({ username: user.username });
                let comparePassword = await bcrypt_1.default.compare(user.password, userInfo.password);
                console.log('userInfo', userInfo.password);
                if (userInfo) {
                    if (comparePassword) {
                        let payload = {
                            username: userInfo.username
                        };
                        let token = jsonwebtoken_1.default.sign(payload, exports.SECRET_KEY, {
                            expiresIn: 360000
                        });
                        res.status(200).json({
                            token: token
                        });
                        console.log('You are in');
                    }
                    else {
                        res.status(401).json({
                            message: 'Password is wrong'
                        });
                        console.log('Wrong password');
                    }
                }
                else {
                    res.status(404).json({
                        message: 'Account is not exist'
                    });
                    console.log('Account is not exist');
                }
            }
            catch (err) {
                console.log('login err: ', err);
            }
        };
    }
}
exports.default = new AuthenController();
//# sourceMappingURL=auth-controller.js.map