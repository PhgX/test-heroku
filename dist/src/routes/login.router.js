"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_controller_1 = __importDefault(require("../controller/auth-controller"));
const upload = (0, multer_1.default)();
exports.loginRoutes = express_1.default.Router();
exports.loginRoutes.get('', auth_controller_1.default.showHomepage);
exports.loginRoutes.get('/login', auth_controller_1.default.showLoginForm);
exports.loginRoutes.post('/login', upload.none(), auth_controller_1.default.login);
exports.loginRoutes.get('/signUp', auth_controller_1.default.showSignUp);
exports.loginRoutes.post('/signUp', upload.none(), auth_controller_1.default.signUp);
//# sourceMappingURL=login.router.js.map