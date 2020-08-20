import { Request, Response } from "express";
import moment from "moment";
import RecipesDatabase, { Recipe } from "../data/RecipesDatabase";
import BaseDB from "../data/BaseDatabase";
import IdGenerator from "../services/IdGenerator";
import Authenticator from "../services/Athenticator";
import UserDatabase from "../data/UserDatabase";

export default async function createRecipe(
	req: Request,
	res: Response
): Promise<void> {
	try {
		const token = req.headers.authorization as string;

		const authenticationData = Authenticator.getTokenData(token);

		const { title, description } = req.body;

		if (!title.replace(/\s/g, "") && !description.replace(/\s/g, "")) {
			throw new Error("Title and description must be informed");
		}

		const userDB = new UserDatabase();
		const user = await userDB.getUserById(authenticationData.id);
		console.log(user);

		const recipeId = IdGenerator.execute();

		const recipeData: Recipe = {
			id: recipeId,
			title: title,
			description: description,
			createdAt: moment().format("YYYY-MM-DD"),
			creatorUserId: user.id,
		};

		const recipeDB = new RecipesDatabase();
		await recipeDB.createRecipe(recipeData);

		res.sendStatus(200);
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	} finally {
		await BaseDB.destroyConnection();
	}
}
