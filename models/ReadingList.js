import db from "../db/index.js";

class ReadingList {
  static async addBook(payload) {
    const { user_id, book_id, want_to_read } = payload;
    const query =
      "INSERT INTO reading_list (user_id, book_id, want_to_read) VALUES (?, ?, ?) RETURNING *";
    const result = await db.raw(query, [user_id, book_id, want_to_read]);
    console.log("book was added to reading list", result[0]);
    return result[0];
  }

  static async removeBook(user_id, book_id) {
    const query = `DELETE FROM reading_list WHERE user_id = ? AND book_id = ? RETURNING *`;
    const result = await db.raw(query, [user_id, book_id]);
    console.log("book was deleted from reading list", result[0]);
    return result[0];
  }

  static async editreadstatus(book_id, user_id, read_status) {
    const query =
      "UPDATE reading_list SET read_status = ? WHERE user_id = ? AND book_id = ?";
    await db.raw(query, [read_status, user_id, book_id]);
  }

  static async getAll(user_id) {
    const query =
      "SELECT books.*, reading_list.* FROM books INNER JOIN reading_list ON books.id = reading_list.book_id WHERE reading_list.user_id = ?;";
    const results = await db.raw(query, [user_id]);
    console.log("results", results);
    return results;
  }
}

export default ReadingList;
