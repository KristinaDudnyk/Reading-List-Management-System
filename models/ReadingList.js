import db from '../db/index.js'

class ReadingList {
   constructor(id, title, author, genre, summary, book_type, isRead = 'N') {
    this.id = id
    this.id = title
    this.id = author
    this.id = genre
    this.id = summary
    this.id = book_type
    this.isRead = isRead === 'Y'
   }

markAsRead() {
    this.isRead = true
}