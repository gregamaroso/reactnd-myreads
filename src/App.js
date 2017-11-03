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

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <BookSearch />
        )} />

        <Route exact path="/" render={() => (
          <BookList books={this.state.books} />
        )} />
      </div>
    );
  }
}

export default BooksApp
