// Payload sent during login
export type LoginPayload = {
    email: string;
    password: string;
};

// Response received after login
export interface LoginResponse {
    success: boolean;       // ✅ your API sends "success"
    message: string;
    token?: string;         // token is only present if success=true
    data?: IUser;           // user object
}

// Role options
export type Role = "admin" | "user";

// User object returned from backend
export interface IUser {
    _id: string;            // ✅ your API includes "_id"
    email: string;
    name: string;
    role: Role;
    createdAt?: string;     // optional since API didn’t return in login
    updatedAt?: string;     // optional since API didn’t return in login
}

// JWT decoded structure
export interface DecodedToken {
    id: string;             // user ID inside token payload
    role: Role;
    iat: number;
    exp: number;
}
