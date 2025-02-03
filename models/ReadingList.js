class ReadingList {
    constructor(id, title, author, genre, summary, book_type, isRead = 'N') {
        this.id = id
        this.title = title
        this.author = author
        this.genre = genre
        this.summary = summary
        this.book_type = book_type
        this.isRead = isRead === 'Y'
    }

    markAsRead() {
        this.isRead = true
    }
}

export default ReadingList
