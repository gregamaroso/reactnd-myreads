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
      .then(() => {
        book.shelf = shelf;

        // TODO: revisit this logic
        this.setState(state => {
          if (state.books.findIndex(b => b.id === book.id) === -1) {
            state.books.push(book);
          }
        })
      });
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <BookSearch
            books={this.state.books}
            onUpdateBook={this.updateBook}
            />
        )} />

        <Route exact path="/" render={() => (
          <BookList
            books={this.state.books}
            onUpdateBook={this.updateBook}
            />
        )} />
      </div>
    );
  }
}

export default BooksApp
