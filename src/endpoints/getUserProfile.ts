import { Request, Response } from "express";
import BaseDB from "../data/BaseDatabase";
import Authenticator from "../services/Athenticator";
import UserDatabase from "../data/UserDatabase";

export default async function getUserProfile(req: Request, res: Response): Promise<any> {
    try {

        const token = req.headers.authorization as string
        const authenticationData = await Authenticator.getTokenData(token)

        const userDB = new UserDatabase()
        const response = await userDB.getUserById(authenticationData.id)

        const user = {
            id: response.id ,
            name: response.name,
            email:  response.email
        }
        
        res
            .status(200)
            .send(user)
                
    } catch (error) {
        res
            .status(400)
            .send({
                message: error.sqlMessage || error.message
            });
    } finally {
        await BaseDB.destroyConnection();
    }
}
        