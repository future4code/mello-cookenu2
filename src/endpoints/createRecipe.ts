import { Request, Response } from "express";
import RecipesDatabase from "../data/RecipesDatabase";
import BaseDB from "../data/BaseDatabase"
import IdGenerator from "../services/IdGenerator"
import HashManager from "../services/HashManager";
import Authenticator from "../services/Athenticator";

export default async function createRecipe (
    req: Request,
    res: Response
): Promise<void> {
    try {
        const token = req.headers.authorization as string

        Authenticator.getTokenData(token)

        const { title, description } = req.body

        if (!title.replace(/\s/g, "") && !description.replace(/\s/g, "")) {
            throw new Error("Title and description must be informed");
        }
        
        







    } catch (error) {
        res.status(400).send({
            message: error.sqlMessage || error
        })
    }
}
