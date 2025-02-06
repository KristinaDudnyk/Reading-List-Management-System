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
}
// app.get('/readinglist/:userId', async (req, res) => {
//   const userId = req.params.userId;
//   const query = `
//     SELECT reading_list.isRead, books.id, books.title, books.author, books.genre
//     FROM reading_list
//     INNER JOIN books ON reading_list.book_id = books.id
//     WHERE reading_list.user_id = ?
//   `;

//   const [results] = await connection.execute(query, [userId]);
//   res.render('readingList.ejs', { readingList: results });
// });

export default ReadingList;
