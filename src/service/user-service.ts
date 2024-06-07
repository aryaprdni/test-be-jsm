import { User, T_Level } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response.error";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, UserResponse, toUserResponse } from "../model/user_model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const checkEmail = await prismaClient.user.count({
            where: {
                email: registerRequest.email
            }
        });

        if (checkEmail != 0) {
            throw new Error("Email already exists");
        }

        const checkTLevel = await prismaClient.t_Level.count({
            where: {
                id: registerRequest.t_level_id
            }
        });

        if (!checkTLevel) {
            throw new Error("Name Level not found");
        }

        const checkTLevelInUse = await prismaClient.user.count({
            where: {
                t_level_id: registerRequest.t_level_id
            }
        });

        if (checkTLevelInUse > 0) {
            throw new Error("t_level is already in use");
        }

        const checkTDepartment = await prismaClient.t_Department.count({
            where: {
                id: registerRequest.t_department_id
            }
        });

        if (!checkTDepartment) {
            throw new Error("Name Department not found");
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: {
                email: registerRequest.email,
                username: registerRequest.username,
                full_name: registerRequest.full_name,
                password: registerRequest.password,
                t_level: {
                    connect: { id: registerRequest.t_level_id }
                },
                t_department: {
                    connect: { id: registerRequest.t_department_id }
                }
            },
            include: {
                t_level: true,
                t_department: true
            }
        });

        return toUserResponse(user, user.t_level!, user.t_department!);
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        let user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email
            },
            include: {
                t_level: true,
                t_department: true
            }
        });

        if (!user) {
            throw new ResponseError(401, "Email or password is wrong");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new ResponseError(401, "Email or password is wrong");
        }

        const obj = {
            email: user.email
        };

        const token = jwt.sign({ obj }, "secret", { expiresIn: "1h" });

        user = await prismaClient.user.update({
            where: {
                email: loginRequest.email
            },
            data: {
                token: token
            },
            include: {
                t_level: true,
                t_department: true
            }
        });

        const response = toUserResponse(user, user.t_level!, user.t_department!);
        response.token = user.token!;
        return response;
    }

    static async logout(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                email: user.email
            },
            data: {
                token: null
            },
            include: {
                t_level: true,
                t_department: true
            }
        });

        return toUserResponse(result, result.t_level!, result.t_department!);
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);
    
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: user.email
            }
        });
    
        if (!existingUser) {
            throw new Error('User not found');
        }
    
        if (updateRequest.email) {
            existingUser.email = updateRequest.email;
        }
    
        if (updateRequest.username) {
            existingUser.username = updateRequest.username;
        }
    
        if (updateRequest.full_name) {
            existingUser.full_name = updateRequest.full_name;
        }
    
        if (updateRequest.password) {
            existingUser.password = await bcrypt.hash(updateRequest.password, 10);
        }
    
        if (updateRequest.phone_number) {
            existingUser.phone_number = updateRequest.phone_number;
        }
    
        const result = await prismaClient.user.update({
            where: {
                email: user.email 
            },
            data: {
                email: existingUser.email,
                username: existingUser.username,
                full_name: existingUser.full_name,
                password: existingUser.password,
                phone_number: existingUser.phone_number
            },
            include: {
                t_level: true,
                t_department: true
            }
        });
    
        return toUserResponse(result, result.t_level!, result.t_department!);
    }
    

    static async delete(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.delete({
            where: {
                email: user.email
            },
            include: {
                t_level: true,
                t_department: true
            }
        });

        return toUserResponse(result, result.t_level!, result.t_department!);
    }

    static async get(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.findUnique({
            where: {
                email: user.email
            },
            include: {
                t_level: true,
                t_department: true
            }
        })

        return toUserResponse(result!, result!.t_level!, result!.t_department!);
    }

    static async getAll(): Promise<User[]> {
        const result = await prismaClient.user.findMany();
        return result;
    }
}
