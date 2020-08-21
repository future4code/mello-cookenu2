import { Request, Response } from "express";
import moment from "moment";
import RecipesDatabase from "../data/RecipesDatabase";
import BaseDB from "../data/BaseDatabase";
import Authenticator from "../services/Athenticator";

export default async function getRecipe (req: Request, res: Response): Promise<any> {
    try {
        const token = req.headers.authorization as string
        Authenticator.getTokenData(token)

        const recipeDB = new RecipesDatabase()
        const response = await recipeDB.getRecipeById(req.params.id)
        
        const recipe = {
            id: response.id,
            title: response.title,
            description: response.description,
            createdAt: moment(response.created_at).format("DD/MM/YYYY")
        }
        
        res.status(200).send(recipe)
    } catch (error) {
        res.status(400).send({
            message: error.sqlMessage || error.message 
        })
    } finally {
        await BaseDB.destroyConnection()
    }
} 