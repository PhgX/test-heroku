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
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../schema/user.model");
class Validate {
    constructor() {
        this.ValidateUserName = (username) => __awaiter(this, void 0, void 0, function* () {
            let user = yield user_model_1.User.findOne({ username: username });
            if (!user) {
                return true;
            }
            else {
                return false;
            }
        });
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
        this.checkEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            let checkEmail = yield user_model_1.User.find({ email: email });
            if (!checkEmail) {
                return true;
            }
            else {
                return false;
            }
        });
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