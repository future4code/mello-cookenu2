import { Request, Response } from "express";
import RecipesDatabase from "../data/RecipesDatabase";
import BaseDB from "../data/BaseDatabase";
import Authenticator from "../services/Athenticator";


export default async function deleteRecipe(req: Request, res: Response): Promise<void> {
    try {
        const token = req.headers.authorization as string
        const authenticationData = Authenticator.getTokenData(token)
                
        const recipeDB = new RecipesDatabase()
        const recipe = await recipeDB.getRecipeById(req.params.id)
        const authenticity = await recipeDB.checkRecipeAuthor(authenticationData.id, req.params.id)

        if (!recipe) {
            throw new Error("Recipe no found");   
        }

        if (!authenticity && authenticationData.role !== "admin") {
            throw new Error("Cannot possible edit another users recipes");
        }

        await recipeDB.deleteRecipe(req.params.id)

        res.sendStatus(200)

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        await BaseDB.destroyConnection()
    }
}