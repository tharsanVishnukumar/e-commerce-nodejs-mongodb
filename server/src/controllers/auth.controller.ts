import { Response, Request } from "express";
import { Controller } from "./type";
import { log } from "../log";
import { z } from "zod";
import { Errors } from "../error";
import { sessionService, userService } from "../services";


export class AuthController extends Controller {
    init(): void {
        log({
            message: "AuthController init",
            type: "info"
        })
        this.app.post("/auth/signin", this.signin.bind(this));
        this.app.post("/auth/signup", this.signup.bind(this));
    }
    private zSignin = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });

    private async signin(res: Response, req: Request) {
        try {
            const data = this.zSignin.parse(req.body);
            const user = await userService.authenticate(data);
            const session = await sessionService.create({
                user
            });
            res.status(200).json({
                message: "User authenticated",
                token: session.token
            });
        } catch (error) {
            Errors.handler(error, res);
        }
    }
    private zSignup = z.object({
        email: z.string({
            description: "Email must be a valid email address.",
            required_error: "Email is required"
        }).email({ message: "Invalid email address" }),
        firstname: z.string({
            description: "First name must be at least 2 characters long.",
            required_error: "First name is required"
        }).min(2, {
            message: "First name must be at least 2 characters long."
        }),
        lastname: z.string({
            description: "Last name must be at least 2 characters long.",
            required_error: "Last name is required"
        }).min(2, {
            message: "Last name must be at least 2 characters long."
        }),
        password: z.string({
            description: "Password must be at least 6 characters long.",
            required_error: "Password is required"
        }).min(6, { message: "Password must be at least 6 characters long." })
    });
    private async signup(res: Response, req: Request) {
        try {
            const data = this.zSignup.parse(req.body);
            const user = await userService.create(data);
            const session = await sessionService.create({
                user
            });
            res.status(201).json({
                message: "User created",
                token: session.token
            });
        } catch (error) {
            Errors.handler(error, res);
        }
    }
}