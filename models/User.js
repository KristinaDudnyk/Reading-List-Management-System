import db from '../db/index.js'

class User {
  static async findUser(username, email) {
    const query = "SELECT * FROM users where username = ? AND email = ?";
    const results = await db.raw(query, [username, email]);
    return results[0];
  }

  static async createUser(username, first_name, last_name, email) {
    const query =
      "INSERT INTO users (username, first_name, last_name, email) VALUES (?, ?, ?, ?)";
    const results = await db.raw(query, [
      username,
      first_name,
      last_name,
      email,
    ]);
    return results[0];
  }

  static async deleteUser() {
    const query = "DELETE FROM users where username = ? AND email = ?";
    const results = await db.raw(query, [username, email]);
    return results[0];
  }
}
export default User;
