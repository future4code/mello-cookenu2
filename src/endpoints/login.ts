import { Request, Response } from "express";
import UserDatabase from "../data/UserDatabase";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Athenticator";
import BaseDB from "../data/BaseDatabase"


export default async function login(req: Request, res: Response): Promise<void> {
    try {
        
        const { email, password } = req.body;

        if(!email) {
            throw new Error("email not informed");
        } 

        if(!password) {
            throw new Error("password not informed");
        }

        const userData = new UserDatabase();
        const user = await userData.getUserByEmail(email);

        const comparePassword = await HashManager.compare(password, user.password);

        if(!comparePassword) {
            throw new Error("Usuario ou senha incorretos")
        }

        const token = Authenticator.generateToken({
            id: user.id,
            role: user.role
        });

        res.status(200).send({
            "access_token": token
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        await BaseDB.destroyConnection();
    }
}


