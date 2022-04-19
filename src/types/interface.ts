export interface IFormLogin {
    email: string,
    password: string;
}
export interface IFormSignUp {
    first_name:string
    last_name:string
    email:string
    password:string
    re_password:string
}
export interface IFormResetPass{
    email:string
}
export interface IFormResetPassConfirm{
    password:string
    re_password:string
}
