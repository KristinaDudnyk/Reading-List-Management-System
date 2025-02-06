import db from '../db/index.js';


class ReadingList {

  markAsRead() {
    this.isRead = true;
  }

  static async addBooktolist(payload) {
    const { user_id, book_id, read_status, want_to_read } = payload;

    const query =
      "INSERT INTO reading_list (user_id, book_id, read_status, want_to_read) VALUES (?, ?, ?, ?)";
    await db.raw(query, [user_id, book_id, read_status, want_to_read]);
  }

  static async removefromlist(user_id, book_id) {
    const query =
      `DELETE FROM reading_list WHERE user_id = ? AND book_id = ?`;
    await db.raw(query, [user_id, book_id]);
  }

  static async editreadstatus(book_id, user_id, read_status) {
    const query =
      "UPDATE reading_list SET read_status = ? WHERE user_id = ? AND book_id = ?";
    await db.raw(query, [read_status, user_id, book_id ]);
  }

  static async getReadingList() {
    const userdata = JSON.parse(localStorage.getItem("user"));
    const userid = userdata.id;
    console.log(userid);
  
    const query = "SELECT * FROM reading_list WHERE user_id = ?";
    const [results] = await db.raw(query, [userid]);
    return results;
  }

static async getAll(user) { 
  const query = "SELECT books.*, reading_list.* FROM books INNER JOIN reading_list ON books.id = reading_list.book_id WHERE reading_list.user_id = ?;"; 
  const results = await db.raw(query, [user]); 
  return results; }
}

export default ReadingList;
