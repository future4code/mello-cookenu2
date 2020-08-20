import { v4 } from "uuid";

export default class IdGenerator {
	public static execute(): string {
		return v4();
	}
}

