import { Request, Response } from "express"
export class AuthController {
    constructor() {

    }

    register = (req: Request, res: Response) => {
        res.json('registerUser')
    }


    loginUser = (req: Request, res: Response) => {
        res.json('loginUser')
    }

    validateEmail = (req: Request, res: Response) => {
        res.json('validateUser')
    }

}