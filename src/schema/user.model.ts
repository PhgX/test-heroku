import { model, Schema } from "mongoose"

interface IUser {
    username?: string,
    password?: string,
    email?: string,
    address?: string,
    phone?: string
}

const userSchema = new Schema<IUser>({
    username: String,
    password: String,
    email: String,
    address: String,
    phone: String
});

const User = model<IUser>('User', userSchema);
export {User}