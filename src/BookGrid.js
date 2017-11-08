import React, { Component } from 'react';
import Book from './Book';

export default class BookGrid extends Component {
  render() {
    const { books, onUpdateBook } = this.props;

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book
              book={book}
              onUpdateBook={onUpdateBook}
              />
          </li>
        ))}
      </ol>
    );
  }
}
