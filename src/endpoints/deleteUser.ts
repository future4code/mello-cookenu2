import { Request, Response } from "express";
import UserDatabase from "../data/UserDatabase";
import BaseDB from "../data/BaseDatabase";
import Authenticator from "../services/Athenticator";

export default async function deleteUser(req: Request, res: Response): Promise<void> {
    try {
        const token = req.headers.authorization as string
        const authenticationData = Authenticator.getTokenData(token)

        const userDB = new UserDatabase()
        const user = await userDB.getUserById(req.params.id)

        if (!user) {
            throw new Error("User not found");
        }

        if (authenticationData.role !== "admin") {
            throw new Error("Cannot possible delete another user profile");
        }

        await userDB.deleteUser(req.params.id)

        res.sendStatus(200)

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        await BaseDB.destroyConnection()
    }
}