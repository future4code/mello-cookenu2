import BaseDB from "./BaseDatabase"

interface Recipe {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    creatorUserId: string
}

export default class RecipesDatabase extends BaseDB {
    private static TABLE_NAME = "recipes"

    public async createRecipe (input: Recipe): Promise<void> {
        await this.getConnection().raw(`
            INSERT INTO ${RecipesDatabase.TABLE_NAME}
            VALUES (
                '${input.id}',
                '${input.title}',
                '${input.description}',
                '${input.createdAt}',
                '${input.creatorUserId}'
            )
        `)
    } 
}