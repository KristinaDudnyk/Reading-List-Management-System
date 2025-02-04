import db from "../db/index.js";


class User {
  static async findUser(id) {
    try {
      const query = "SELECT * FROM users WHERE id = ?";
      const results = await db.raw(query, [id]);
      return results;
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  }

  static async createUser(username, first_name, last_name, email) {
    try {
      const query =
        "INSERT INTO users (username, first_name, last_name, email) VALUES (?, ?, ?, ?) RETURNING *";
      const results = await db.raw(query, [
        username,
        first_name,
        last_name,
        email,
      ]);
      return results;

    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const query = "DELETE FROM users WHERE id = ?";
      await db.raw(query, [id]);
      return results;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

export default User;
