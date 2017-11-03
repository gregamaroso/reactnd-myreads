import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

export class BookGrid extends Component {
  render() {
    const { books, onUpdateBook } = this.props;

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book book={book} onUpdateBook={onUpdateBook} />
          </li>
        ))}
      </ol>
    );
  }
}

export class BookShelf extends Component {
  render() {
    const { title, shelf, books, onUpdateBook } = this.props;

    // Filter out which books to show on this shelf
    const filteredBooks = books.filter((book) => book.shelf === shelf);

    return (
      <div key={shelf} className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <BookGrid
            books={filteredBooks}
            onUpdateBook={onUpdateBook}
            />
        </div>
      </div>
    );
  }
}

export default class BookList extends Component {
  render() {
    const { books, onUpdateBook } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf title="Current Reads" shelf="currentlyReading" books={books} onUpdateBook={onUpdateBook} />
          <BookShelf title="Want to Read" shelf="wantToRead" books={books} onUpdateBook={onUpdateBook} />
          <BookShelf title="Read" shelf="read" books={books} onUpdateBook={onUpdateBook} />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
