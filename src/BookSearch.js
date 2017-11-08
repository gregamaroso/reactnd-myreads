import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookGrid from './BookGrid';

export default class BookSearch extends Component {
  state = {
    query: '',
    results: [],
    isLoading: false,
    hasMadeInitialQuery: false
  }

  /**
   * Search for books using the API
   * Note: this throttles requests similar to how we'd handle large volume sites
   */
  searchBooks = (query) => {
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
              // Filters our books from the results array that are already found on a shelf. This is normally
              // valid to do; however, the rubric says to show them.
              // results = results.filter((book) => this.props.books.findIndex(b => b.id === book.id) === -1);

              // Since we're not filtering out the current books (see above), we'll need to ensure that each result
              // already in the books array gets applied to the appropriate shelf.
              const allBooks = this.props.books;
              results = results.map((r) => {
                const i = allBooks.findIndex(b => b.id === r.id);
                if (i !== -1) {
                  r.shelf = allBooks[i].shelf;
                }
                return r;
              });
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
