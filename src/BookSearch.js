import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { BookGrid } from './BookList';
// import Book from './Book';

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
  }

  state = {
    query: '',
    results: ''
  }

  sanitizeQuery = function(q) {
    q = q.trim();
    return q;
  };

  /**
   * Note the search throttler
   */
  searchBooks = (query) => {
    query = this.sanitizeQuery(query);

    // Immediately update the query state, but throttle
    // the ajax stuff as we'd normally do.
    this.setState({ query });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      if (query) {
        BooksAPI
          .search(query)
          .then(results => {
            console.log(results);
            this.setState({ results });
          });
       }
    }, 200);
  };

  clearQuery = () => {
    this.setState({
      query: ''
    });
  };

  render() {
    const { books, onUpdateBook } = this.props;
    const { query } = this.state;

    // TODO: search and filter

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
            onClick={this.clearQuery}>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => { this.searchBooks(e.target.value) }}
              />
          </div>
        </div>
        <div className="search-books-results">
          <BookGrid
            books={books}
            onUpdateBook={onUpdateBook}
            />
        </div>
      </div>
    );
  }
}

export default BookSearch
