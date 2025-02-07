import db from '../db/index.js';

class Book {
  static genres = ["Fiction", "Non-fiction", "kids"];
  static tags = ["Like", "Love", "Dislike", "Hate"];

  static async findAll() {
    const query = "SELECT * FROM books";
    const results = await db.raw(query);
    return results;
  }

  static async findByGenre(genre) {
    const query = "SELECT * FROM books where genre = ?";
    const results = await db.raw(query, [genre]);
    return results;
  }
  static async findById(id) {
    const query = "SELECT * FROM books where id = ?";
    const results = await db.raw(query, [id]);
    return results;
  }

  static async addBook(title, author, genre, summary, book_type) {
    try {
      const query =
        "INSERT INTO books (title, author, genre, summary, book_type) VALUES (?, ?, ?, ?, ?) RETURNING *";
      const results = await db.raw(query, [
        title,
        author,
        genre,
        summary,
        book_type,
      ]);
      return results[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async editBook(id, title, author, genre, summary, book_type) {
    const query =
      "UPDATE books SET title = ?, author = ?, genre = ?, summary = ?, book_type = ? WHERE id = ? RETURNING *";
    await db.raw(query, [title, author, genre, summary, book_type, id]);
  }

  static async deleteBook(id) {
    const query = "DELETE FROM books WHERE id = ? RETURNING *";
    const results = await db.raw(query, [id]);
    return results;
  }

  static async addTag(bookId, tagName) {
    if (!Book.tags.includes(tagName)) {
      throw new Error("Invalid tag. Valid tags are: Like, Love, Dislike, Hate");
    }

    const query = "UPDATE books SET tag = ? WHERE id = ? RETURNING *";
    const results = await db.raw(query, [tagName, bookId]);
    return results[0];
  }
}

export default Book;
