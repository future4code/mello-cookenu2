import BaseDB from "./BaseDatabase";

export default class UserDatabase extends BaseDB { 
    
    private static USER_TABLE = "user_cookenu";
    private static FOLLOWERS_TABLE = "followers"
    
	public async createUser(
		id: string,
		name: string,
		email: string,
		password: string
	): Promise<void> {
		await this.getConnection().raw(`
            INSERT INTO ${UserDatabase.USER_TABLE} (id, name, email, password)
            VALUES (
                '${id}',
                '${name}',
                '${email}',
                '${password}'
            )        
        `);
	}
		
	public async getUserById(id: any) {
        const result = await this.getConnection().raw(`
			SELECT * FROM ${UserDatabase.USER_TABLE} 
			WHERE id = "${id}" 
		`) 		
		return result[0][0]
    }
    
	public async getUserByEmail(email: any): Promise<any> {
		const result = await this.getConnection().raw(`
			SELECT * FROM ${UserDatabase.USER_TABLE} 
			WHERE email = "${email}" 
		`) 		
		return result[0][0]
    }
    
    public async fallowUser(followerId: string, followedId: string): Promise<void> {
        await this.getConnection().raw(`
            INSERT INTO ${UserDatabase.FOLLOWERS_TABLE}
            VALUE ('${followerId}', '${followedId}')        
        `)
    }
}
