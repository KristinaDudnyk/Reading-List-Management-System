import db from "../db/index.js";

class ReadingList {
  static async addBooktolist(user_id, book_id) {
    const query =
      "INSERT INTO reading_list (user_id, book_id) VALUES (?, ?) RETURNING *";
    const result = db.raw(query, [user_id, book_id]);
    return result;
  }

  static async removefromlist(user_id, book_id) {
    const query = `DELETE FROM reading_list WHERE user_id = ? AND book_id = ? RETURNING *`;
    const result = db.raw(query, [user_id, book_id]);
    return result;
  }

  static async editreadstatus(book_id, user_id, read_status) {
    const query =
      "UPDATE reading_list SET read_status = ? WHERE user_id = ? AND book_id = ?";
    await db.raw(query, [read_status, user_id, book_id]);
  }

  static async getReadingList() {
    const query = "SELECT * FROM reading_list";
    const results = await db.raw(query);
    return results;
  }
}
export default ReadingList;
