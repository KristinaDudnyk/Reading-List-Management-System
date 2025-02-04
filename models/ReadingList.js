import db from '../db/index.js';

class ReadingList {
  markAsRead() {
    this.isRead = true;
  }
  static async addBooktolist(book_id, user_id) {
    const query =
      "INSERT INTO ReadingList (book_id AND user_id) VALUES (?, ?) RETURNING *";
    await db.raw(query, [book_id, user_id]);
    return results[0];
  }

  static async removefromlist(book_id, user_id) {
    const query =
      "DELETE FROM ReadingList (book_id AND user_id) VALUES (?, ?) RETURNING *";
    await db.raw(query, [book_id, user_id]);
    return results[0];
  }

  static async editreadstatus(book_id, user_id, read_status) {
    const query =
      "UPDATE ReadingList SET (book_id AND user_id AND read_status) VALUES (?, ?, ?) RETURNING *";
    await db.raw(query, [book_id, user_id, read_status]);
    return results[0];
  }
}

export default ReadingList;
//test
