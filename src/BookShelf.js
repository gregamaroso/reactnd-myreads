import React, { Component } from 'react';
import BookGrid from './BookGrid';

export default class BookShelf extends Component {
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
