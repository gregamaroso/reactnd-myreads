import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookSearch from './BookSearch';
import BookList from './BookList';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
        this.setState({
          books: books
        });
      });
  }

  updateBook = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(() => { });
  };

  onUpdateBook = (book, shelf) => {
    this.updateBook(book, shelf);

    // Make a copy of the current books array which we'll modify
    // before setting the new state
    let books = [...this.state.books];

    // Set which shelf the current book object should be on
    book.shelf = shelf;

    // Determine if this is a new book based on i !== -1
    const i = books.findIndex(b => b.id === book.id);

    // If it's a new book (i.e. i === -1), then push it onto the books array
    // Otherwise, replace the book item in the array with the new value
    if (i === -1) {
      books.push(book);
    }
    else {
      books[i] = book;
    }

    // Finally, update state with the munged book array
    this.setState({ books });
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <BookSearch
            books={this.state.books}
            onUpdateBook={this.onUpdateBook}
            timeout="0"
            />
        )} />

        <Route exact path="/" render={() => (
          <BookList
            books={this.state.books}
            onUpdateBook={this.onUpdateBook}
            />
        )} />
      </div>
    );
  }
}

export default BooksApp
