import { ZodType, z } from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        email: z.string().min(3, { message: "Email must be at least 3 characters long" }).max(100, { message: "Email must be at most 100 characters long" }).email({ message: "Invalid email format" }),
        username: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(100, { message: "Username must be at most 100 characters long" }),
        full_name: z.string().min(3, { message: "Full name must be at least 3 characters long" }).max(100, { message: "Full name must be at most 100 characters long" }),
        password: z.string().min(3, { message: "Password must be at least 3 characters long" }).max(100, { message: "Password must be at most 100 characters long" }),
        phone_number: z.string().min(3, { message: "Phone number must be at least 3 characters long" }).max(100, { message: "Phone number must be at most 100 characters long" }).optional(),
        t_level_id: z.number().positive({ message: "Level ID must be a positive number" }),
        t_department_id: z.number().positive({ message: "Department ID must be a positive number" }),
    });

    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(3, { message: "Email must be at least 3 characters long" }).max(100, { message: "Email must be at most 100 characters long" }).email({ message: "Invalid email format" }),
        password: z.string().min(3, { message: "Password must be at least 3 characters long" }).max(100, { message: "Password must be at most 100 characters long" }),
    });

    static readonly UPDATE: ZodType = z.object({
        email: z.string().min(3, { message: "Email must be at least 3 characters long" }).max(100, { message: "Email must be at most 100 characters long" }).email({ message: "Invalid email format" }).optional(),
        username: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(100, { message: "Username must be at most 100 characters long" }).optional(),
        full_name: z.string().min(3, { message: "Full name must be at least 3 characters long" }).max(100, { message: "Full name must be at most 100 characters long" }).optional(),
        password: z.string().min(3, { message: "Password must be at least 3 characters long" }).max(100, { message: "Password must be at most 100 characters long" }).optional(),
        phone_number: z.number().positive({ message: "Phone number must be a positive number" }).optional(), // Tidak menggunakan min dan max
        t_level_id: z.number().positive({ message: "Level ID must be a positive number" }).optional(),
        t_department_id: z.number().positive({ message: "Department ID must be a positive number" }).optional(),
    });
}
