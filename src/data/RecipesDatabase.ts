import BaseDB from "./BaseDatabase"

export interface Recipe {
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

    public async getRecipeById (id: string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT * FROM ${RecipesDatabase.TABLE_NAME}
            WHERE id = '${id}'
        `)
        return result[0][0]
    }

    public async getRecipesFeed (userId: string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT 
                r.id,
                r.title, 
                r.description, 
                r.created_at, 
                r.creator_user_id, 
                uc.name AS creator_user_name
            FROM ${RecipesDatabase.TABLE_NAME} r 
                JOIN user_cookenu uc 
                    ON r.creator_user_id = uc.id
                JOIN followers f 
                    ON f.followed_id = uc.id
            WHERE f.user_id = '${userId}'
            ORDER BY created_at DESC;
        `)
        
        return result [0]
    }

    public async checkRecipeAuthor (userId: string, recipeId: string): Promise<boolean> {
        const result = await this.getConnection().raw(`
            SELECT COUNT (*) AS count
            FROM ${RecipesDatabase.TABLE_NAME}
            WHERE creator_user_id = '${userId}' AND  id = '${recipeId}'
        `)
        return Boolean(result[0][0].count)
    }

    public async editRecipe (recipeId: string, title: string, description: string): Promise<void> {        
        await this.getConnection().raw(`
            UPDATE ${RecipesDatabase.TABLE_NAME}
            SET 
                title = IF (${title.replace(/\s/g,"").length}, "${title}", title), 
                description = IF (${description.replace(/\s/g,"").length}, "${description}", description)
            WHERE id = '${recipeId}'    
        `)
    }
}