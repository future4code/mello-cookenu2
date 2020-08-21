import { Request, Response } from "express";
import UserDatabase from "../data/UserDatabase";
import BaseDB from "../data/BaseDatabase";
import IdGenerator from "../services/IdGenerator";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Athenticator";

export default async function (req: Request, res: Response): Promise<void> {
    try {
        const token = req.headers.authorization as string
        const authenticationData = Authenticator.getTokenData(token)
        
        if (!req.body.userToFollowId) {
            throw new Error("Id must be informed");
        }

        const userDB = new UserDatabase()
        const userToFollow = await userDB.getUserById(req.body.userToFollowId)
        
        if (!userToFollow) {
            throw new Error("User not found");
        }

        await userDB.fallowUser(authenticationData.id, req.body.userToFollowId)

        res.status(200).send({
            message: "Followed successfully"
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        await BaseDB.destroyConnection()
    }

}