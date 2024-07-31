import PropTypes from 'prop-types';
import { EType } from "./core/enum";
import * as BooksApi from "./BooksAPI";
import { useCallback } from "react";

const BookItem = ({ book, updateList }) => {
  // Function to handle book shelf updates
  const updateType = useCallback((e) => {
    const [bookId, typeUpdate] = e.split(",");
    if (bookId && typeUpdate) {
      BooksApi.update(bookId, typeUpdate)
        .then((res) => {
          if (res) {
            updateList();
          }
        })
        .catch((error) => {
          console.error("Error updating book shelf:", error);
        });
    }
  }, [updateList]);

  // Use CSS classes for styling instead of inline styles
  const coverStyle = {
    backgroundImage: `url(${book?.imageLinks?.thumbnail || ''})`
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={coverStyle}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(e) => updateType(e.target.value)}
              value={`${book.id},${book.shelf || "none"}`}
            >
              <option value="none" disabled>Move to...</option>
              <option value={`${book.id},${EType.READING}`}>Currently Reading</option>
              <option value={`${book.id},${EType.WANT_TO_READ}`}>Want To Read</option>
              <option value={`${book.id},${EType.READ}`}>Read</option>
              <option value={`${book.id},${EType.NONE}`}>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors?.join(", ") || "Unknown Author"}</div>
      </div>
    </li>
  );
};

// Define PropTypes to enforce prop types
BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    shelf: PropTypes.string,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string
    })
  }).isRequired,
  updateList: PropTypes.func.isRequired
};

export default BookItem;