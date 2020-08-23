import BaseDB from "./BaseDatabase";

export default class UserDatabase extends BaseDB { 
    
    private static USER_TABLE_NAME = "user_cookenu";
    private static FOLLOWERS_TABLE_NAME = "followers"
    
	public async createUser(
		id: string,
		name: string,
		email: string,
        password: string,
        role?: string
	): Promise<void> {
		await this.getConnection().raw(`
            INSERT INTO ${UserDatabase.USER_TABLE_NAME} (id, name, email, password, role)
            VALUES (
                '${id}',
                '${name}',
                '${email}',
                '${password}',
                '${role}'
            )        
        `);
	}
		
	public async getUserById(id: any) {
        const result = await this.getConnection().raw(`
			SELECT * FROM ${UserDatabase.USER_TABLE_NAME} 
			WHERE id = "${id}" 
		`) 		
		return result[0][0]
    }
    
	public async getUserByEmail(email: any): Promise<any> {
		const result = await this.getConnection().raw(`
			SELECT * FROM ${UserDatabase.USER_TABLE_NAME} 
			WHERE email = "${email}" 
		`) 		
		return result[0][0]
    }
    
    public async fallowUser(followerId: string, followedId: string): Promise<void> {
        await this.getConnection().raw(`
            INSERT INTO ${UserDatabase.FOLLOWERS_TABLE_NAME}
            VALUE ('${followerId}', '${followedId}')        
        `)
    }

    public async deleteUser(userId: string): Promise<void> {
        await this.getConnection().raw(`
            
        
        
        `)        

    }
    

}
	