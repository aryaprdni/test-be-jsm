import { T_Department, T_Level, User } from "@prisma/client";

export type UserResponse = {
    email: string;
    username: string | null;
    full_name: string | null;
    phone_number: number | null;
    token?: string;
    t_level?: {
        id: number;
        level_name: string;
    };
    t_Department?: {
        id: number;
        department_name: string;
    }
}

export type CreateUserRequest = {
    email: string;
    username: string;
    full_name: string;
    password: string;
    t_level_id: number;
    t_department_id: number;
}

export type LoginUserRequest = {
    email: string;
    password: string;
}

export type UpdateUserRequest = {
    email?: string;
    username?: string;
    full_name?: string;
    password?: string;
    phone_number?: number;
    t_level_id?: number;
    t_department_id?: number;
}

export function toUserResponse(user: User, t_level: T_Level, t_department: T_Department): UserResponse {
    return {
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        phone_number: user.phone_number,
        t_level: {
            id: t_level.id,
            level_name: t_level.level_name
        },
        t_Department: {
            id: t_department.id,
            department_name: t_department.department_name
        }
    }
}
