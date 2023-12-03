import { Token } from "./token";
import { User } from "./user";

export interface AuthResponse {
    user: User,
    token: Token
}