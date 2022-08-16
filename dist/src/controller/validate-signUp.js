"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../schema/user.model");
class Validate {
    constructor() {
        this.ValidateUserName = async (Username) => {
            let value = await user_model_1.User.findOne({ username: Username });
            console.log('User = ', Username);
            console.log('username = ', value);
            if (value == null) {
                return true;
            }
            else {
                return false;
            }
        };
        this.ValidatePassword = (password, repassword) => {
            let regExPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/);
            if (password.match(regExPassword)) {
                return true;
            }
            else {
                return false;
            }
        };
        this.passwordMatch = (password, repassword) => {
            if (password === repassword) {
                return true;
            }
            else {
                return false;
            }
        };
        this.checkEmail = async (Email) => {
            let value = await user_model_1.User.findOne({ email: Email });
            if (value == null) {
                return true;
            }
            else {
                return false;
            }
        };
        this.ValidateEmail = (email) => {
            let emailRegex = /^(([^<>()[\]\\.,;:!#$%^&*()\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (email.match(emailRegex)) {
                return true;
            }
            else {
                return false;
            }
        };
        this.checkArray = (a) => {
            let flag = true;
            for (let numb of a) {
                if (numb != " ") {
                    if (isNaN(+numb)) {
                        flag = false;
                    }
                }
                else {
                    flag = false;
                }
            }
            if (flag === true) {
                return true;
            }
            else {
                return false;
            }
        };
        this.ValidatePhone = (phone) => {
            if (phone) {
                let phoneSplit = phone.split('');
                if (this.checkArray(phoneSplit) && phone.split("").length === 10) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
    }
}
exports.default = new Validate();
//# sourceMappingURL=validate-signUp.js.map