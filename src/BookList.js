import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class BookShelf extends Component {
  render() {
    const { title, shelf, books } = this.props;

    // Filter out which books to show on this shelf
    const filteredBooks = books.filter((book) => book.shelf === shelf);

    return (
      <div key={shelf} className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filteredBooks.map((book) => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

class BookList extends Component {
  render() {
    const { books } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf title="Current Reads" shelf="currentlyReading" books={books} />
          <BookShelf title="Want to Read" shelf="wantToRead" books={books} />
          <BookShelf title="Read" shelf="read" books={books} />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookList
