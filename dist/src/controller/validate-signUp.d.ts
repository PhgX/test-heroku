declare class Validate {
    ValidateUserName: (username: string) => Promise<boolean>;
    ValidatePassword: (password: string, repassword: string) => boolean;
    passwordMatch: (password: string, repassword: string) => boolean;
    checkEmail: (email: string) => Promise<boolean>;
    ValidateEmail: (email: string) => boolean;
    checkArray: (a: string[]) => boolean;
    ValidatePhone: (phone: string) => boolean;
}
declare const _default: Validate;
export default _default;
