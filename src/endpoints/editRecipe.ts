import { Request, Response } from "express";
import moment from "moment";
import RecipesDatabase, { Recipe } from "../data/RecipesDatabase";
import BaseDB from "../data/BaseDatabase";
import IdGenerator from "../services/IdGenerator";
import Authenticator from "../services/Athenticator";
import UserDatabase from "../data/UserDatabase";

export default async function editRecipe (req: Request, res: Response): Promise<void> {
    try{
        const token = req.headers.authorization as string
        const authenticationData = Authenticator.getTokenData(token)

        const { title, description } = req.body

        const recipeDB = new RecipesDatabase()
        const recipe = await recipeDB.getRecipeById(req.params.id)
        const authenticity = await recipeDB.checkRecipeAuthor(authenticationData.id, req.params.id)

        if (!recipe) {
            throw new Error("Recipe no found");   
        }

        if (!authenticity) {
            throw new Error("Cannot possible edit other users recipes");
        }

        if (!title && !description) {
            throw new Error("Enter at least one value to change");
            
        }

        await recipeDB.editRecipe(req.params.id, title, description)

        res.sendStatus(200)    
    } catch (error) {
        res.status(400).send({
            message: error.sqlMessage || error.message 
        })
    } finally {
        await BaseDB.destroyConnection()
    }
}