import BaseDB from "./BaseDatabase";

export default class UserDatabase extends BaseDB {
	private static TABLE_NAME = "user_cookenu";

	public async createUser(
		id: string,
		name: string,
		email: string,
		password: string
	): Promise<void> {
		await this.getConnection().raw(`
            INSERT INTO ${UserDatabase.TABLE_NAME} (id, name, email, password)
            VALUES (
                '${id}',
                '${name}',
                '${email}',
                '${password}'
            )        
        `);
	}
}
