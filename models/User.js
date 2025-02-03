import db from "../db/index.js";

class User {
  static async findUser(username, email) {
    try {
      const query = "SELECT * FROM users WHERE username = ? AND email = ?";
      const results = await db.raw(query, [username, email]);
      return results.rows[0];
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  }

  static async createUser(username, first_name, last_name, email) {
    try {
      const query =
        "INSERT INTO users (username, first_name, last_name, email) VALUES (?, ?, ?, ?)";
      const results = await db.raw(query, [
        username,
        first_name,
        last_name,
        email,
      ]);
      return results.rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async deleteUser(username, email) {
    try {
      const query = "DELETE FROM users WHERE username = ? AND email = ?";
      const results = await db.raw(query, [username, email]);
      return results.rows;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

export default User;
