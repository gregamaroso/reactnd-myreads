import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { BookGrid } from './BookList';

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
  }

  state = {
    query: '',
    results: [],
    isLoading: false,
    hasMadeInitialQuery: false
  }

  /**
   * In the real world we'd likely filter out more things here
   */
  sanitizeQuery = function(q) {
    return q;
  };

  /**
   * Search for books using the API
   * Note: this throttles requests similar to how we'd handle large volume sites
   */
  searchBooks = (query) => {
    query = this.sanitizeQuery(query);

    // Immediately update the query state, but throttle
    // the ajax stuff as we'd normally do.
    this.setState({
      query: query,
      isLoading: true
    });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      // Trim the query variable before making ajax requests
      // so that we don't get duped by spaces
      query = query.trim();

      if (query.length > 0) {
        BooksAPI
          .search(query)
          .then(results => {
            if (results.length) {
              results = results.filter((book) => this.props.books.findIndex(b => b.id === book.id) === -1);
            }
            else {
              results = [];
            }
            this.setState({
              results: results,
              isLoading: false,
              hasMadeInitialQuery: true
             });
          });
       }
       else {
         this.clearQuery();
       }
    }, 200);
  };

  clearQuery = () => {
    this.setState({
      query: '',
      results: [],
      isLoading: false
    });
  };

  render() {
    const { onUpdateBook } = this.props;
    const { query, isLoading } = this.state;

    const books = this.state.results;
    const hasResults = books.length > 0;
    const hasMadeInitialQuery = this.state.hasMadeInitialQuery;

    // Dynamically generate a list of classnames for the results wrapper
    const resultsClasses = [
      'search-books-results',
      (isLoading ? 'loading' : '')
    ].filter((v) => v.length > 0).join(' ');

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
        <div className={resultsClasses}>
          {hasResults && (
          <BookGrid
            books={books}
            onUpdateBook={onUpdateBook}
            />
          )}
          {hasMadeInitialQuery && !hasResults && (
            <p>No results</p>
          )}
        </div>
      </div>
    );
  }
}

export default BookSearch
