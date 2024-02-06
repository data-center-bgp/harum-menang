export interface UserRegister {
    password: string;
    email: string;
    name: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface EditUser {
    email: string | undefined;
    password: string | undefined;
    name: string | undefined;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}