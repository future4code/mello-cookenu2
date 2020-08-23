import { Request, Response } from "express";
import UserDatabase from "../data/UserDatabase";
import BaseDB from "../data/BaseDatabase";
import Authenticator from "../services/Athenticator";

export default async function unfollowUser(req: Request, res: Response): Promise<void> {
    try {
        const token = req.headers.authorization as string
        const authenticationData = Authenticator.getTokenData(token)

        if (!req.body.userToUnfollowId) {
            throw new Error("Id must be informed");
        }

        const userDB = new UserDatabase()
        const userToUnfollow = await userDB.getUserById(req.body.userToUnfollowId)

        if (!userToUnfollow) {
            throw new Error("User not found");
        }
        
        await userDB.unfollowUser(authenticationData.id, req.body.userToUnfollowId)

        res.status(200).send({
            message: "Unfollowed successfully"
        })
    } catch (error) {
        res.status(400).send({
            message: error.sqlMessage || error.message 
        })
    } finally {
        await BaseDB.destroyConnection()
    }
}