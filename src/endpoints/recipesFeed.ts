import { Request, Response } from "express";
import moment from "moment";
import RecipesDatabase from "../data/RecipesDatabase";
import BaseDB from "../data/BaseDatabase";
import Authenticator from "../services/Athenticator";

export default async function getRecipesFeed (req: Request, res: Response): Promise<any> {
    try {
        const token = req.headers.authorization as string
        const authenticationData = Authenticator.getTokenData(token)
        
        const recipesDB = new RecipesDatabase()
        const response = await recipesDB.getRecipesFeed(authenticationData.id)
        
        const recipes = response.map((item: any) => {
            return ({
                id: item.id,
			    title: item.title,
			    description: item.description,
			    createdAt: moment(item.created_at).format("DD/MM/YYYY"),
			    userId: item.creator_user_id,
			    userName: item.creator_user_name
            })
        })

        res.status(200).send({
            recipes: recipes   
        })
    } catch (error) {
        res.format(400).send({
            message: error.sqlMessage || error.message
        })
    } finally {
        await BaseDB.destroyConnection()
    }
}