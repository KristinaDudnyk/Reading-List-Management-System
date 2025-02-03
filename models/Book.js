class Book {
    static genres = [
        'Fiction',
        'Non-fiction',
        'kids', 
    ]

    static async findAll() {
        const query = 'SELECT * FROM books';
        const results = await db.raw(query);
        return results;
    }
    
    static async findByGenre(genre) {
        const query = 'SELECT * FROM books where genre = ?';
        const results = await db.raw(query, [genre]);
        return results;
    
    }
    static async findById(id) {
      const query = 'SELECT * FROM books where id = ?';
      const results = await db.raw(query, [id]);
      return results;
    }
    
    static async addBook(title, author, genre, summary, book_type) {
        const query = 'INSERT INTO books (title, author, genre, summary, book_type) VALUES (?, ?, ?, ?, ?)';
        await db.raw(query, [title, author, genre, summary, book_type]);
    }

    static async editBook(id, title, author, genre, summary, book_type) {
        const query = 'UPDATE books SET title = ?, author = ?, genre = ?, summary = ?, book_type = ? WHERE id = ?';
        await db.raw(query, [title, author, genre, summary, book_type, id]);
    }

    static async deleteBook(id) {
        const query = 'DELETE FROM books WHERE id = ';
        const results = await db.raw(query, [id]);
        return results;

    }

}

    
  export default Book;