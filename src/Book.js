import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { book } = this.props;

    // Convenience vars
    const thumb = book.imageLinks.thumbnail;
    const authors = book.authors.join(', ');
    const shelf = book.shelf || 'none';

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: `url(${thumb})` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf}>
            <option value="none" disabled>Move to ...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

export default Book