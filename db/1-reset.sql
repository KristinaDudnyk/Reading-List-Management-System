-- Drop the 'books' table if it exists
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;

-- Create the 'books' table
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    summary TEXT NOT NULL,
    book_type TEXT NOT NULL
);

DROP TABLE IF EXISTS users;

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);