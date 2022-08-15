"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../schema/user.model");
const validate_signUp_1 = __importDefault(require("./validate-signUp"));
class AuthenController {
    constructor() {
        this.showSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('auth/signUp');
        });
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let userSignUp = req.body;
            let checkedInfo = new user_model_1.User(req.body);
            console.log(userSignUp);
            let username = userSignUp.username;
            let password = userSignUp.password;
            let repassword = userSignUp.re_password;
            let email = userSignUp.email;
            let phone = userSignUp.phone;
            if ((yield validate_signUp_1.default.ValidateUserName(username)) &&
                validate_signUp_1.default.ValidatePassword(password, repassword) &&
                validate_signUp_1.default.passwordMatch(password, repassword) &&
                validate_signUp_1.default.ValidateEmail(email) &&
                (yield validate_signUp_1.default.checkEmail(email)) &&
                validate_signUp_1.default.ValidatePhone(phone)) {
                yield checkedInfo.save();
                console.log('Sign Up Success');
            }
            else if ((yield validate_signUp_1.default.ValidateUserName(username)) == false) {
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
            else if ((yield validate_signUp_1.default.checkEmail(email)) == false) {
                console.log('Email already used');
            }
            else if (validate_signUp_1.default.ValidatePhone(phone) == false) {
                console.log('Please enter your phone number in 10 digits');
            }
        });
        this.showHomepage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('products/home');
        });
        this.showLoginForm = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('auth/login');
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.body;
                let loginUserName = user.username;
                let loginPassword = user.password;
                let checkUser = yield user_model_1.User.findOne({ username: loginUserName });
                if (checkUser) {
                    if (loginPassword == checkUser.password) {
                        console.log('You are in');
                    }
                    else {
                        console.log('Wrong password');
                    }
                }
                else {
                    console.log('Account is not exist');
                }
            }
            catch (err) {
                console.log('login err: ', err);
            }
        });
    }
}
exports.default = new AuthenController();
//# sourceMappingURL=auth-controller.js.map