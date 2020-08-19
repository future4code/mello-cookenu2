import BaseDatabase from "./BaseDatabase"

export default class UserDatabase extends BaseDatabase {

    private static TABLE_NAME = "UserCookenu"

    public async createUser(id: string, email: string, password: string): Promise<void> {
        await this.getConnection().raw(`
            INSERT INTO ${UserDatabase.TABLE_NAME} (id, email, password)
            VALUES (${id}, ${email}, ${password})        
        `) 
    }
    





}