import { Request, Response } from "express";
export declare const SECRET_KEY = "379999";
declare class AuthenController {
    showHomepage: (req: Request, res: Response) => Promise<void>;
    showSignUp: (req: Request, res: Response) => Promise<void>;
    signUp: (req: Request, res: Response) => Promise<void>;
    showLoginForm: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
}
declare const _default: AuthenController;
export default _default;
