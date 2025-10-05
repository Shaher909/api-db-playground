import client from "../database.js";

export type User = {
  id?: Number;
  username: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get items ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    // Implementation to add a user to the database
    try {
      const sql =
        "INSERT INTO users (username, password) VALUES($1, $2) RETURNING *";

      const conn = await client.connect();

      const result = await conn.query(sql, [user.username, user.password]);

      const newUser = result.rows[0];

      conn.release();

      return newUser;
    } catch (err) {
      throw new Error(`Could not add new user ${user.username}. Error: ${err}`);
    }
  }
}
