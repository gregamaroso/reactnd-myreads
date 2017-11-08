import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

export default class BookList extends Component {
  render() {
    const { books, onUpdateBook } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            title="Currently Reading"
            shelf="currentlyReading"
            books={books}
            onUpdateBook={onUpdateBook}
            />
          <BookShelf
            title="Want to Read"
            shelf="wantToRead"
            books={books}
            onUpdateBook={onUpdateBook}
            />
          <BookShelf
            title="Read"
            shelf="read"
            books={books}
            onUpdateBook={onUpdateBook}
            />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
