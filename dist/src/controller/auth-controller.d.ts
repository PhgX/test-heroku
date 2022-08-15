import { Request, Response } from "express";
declare class AuthenController {
    showSignUp: (req: Request, res: Response) => Promise<void>;
    signUp: (req: Request, res: Response) => Promise<void>;
    showHomepage: (req: Request, res: Response) => Promise<void>;
    showLoginForm: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
}
declare const _default: AuthenController;
export default _default;
