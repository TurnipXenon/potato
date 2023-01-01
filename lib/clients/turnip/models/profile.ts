import {User} from "./user";
import {Token} from "./token";

export interface Profile {
    user: User;
    token: Token;
}