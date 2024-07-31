import * as BooksApi from "./BooksAPI";
import { useEffect, useState, useCallback } from "react";
import BookItem from "./BookItem";
import { Link } from "react-router-dom";
import { EType } from "./core/enum";

export const BookList = () => {
  const [books, setBookList] = useState([]);

  const getBookList = useCallback(async () => {
    try {
      const res = await BooksApi.getAll();
      if (res) {
        setBookList(res);
      }
    } catch (error) {
      console.error("Error fetching book list:", error);
    }
  }, []);

  useEffect(() => {
    getBookList();
  }, [getBookList]);

  const listType = [
    { label: "Currently Reading", enum: EType.READING },
    { label: "Want to Read", enum: EType.WANT_TO_READ },
    { label: "Read", enum: EType.READ },
  ];

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {listType.map((shelf) => {
            const booksOnShelf = books.filter((book) => book.shelf === shelf.enum);
            return (
              <div className="bookshelf" key={shelf.enum}>
                <h2 className="bookshelf-title">{shelf.label}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {booksOnShelf.map((book) => (
                      <BookItem
                        book={book}
                        key={book.id}
                        updateList={getBookList} // Use memoized callback
                      />
                    ))}
                  </ol>
                </div>
              </div>
            );
          })}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

export default BookList;