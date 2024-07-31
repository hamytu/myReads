import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import BookItem from "./BookItem";
import * as BooksApi from "./BooksAPI";

export const SearchBook = () => {
  const [keyWord, setKeyWord] = useState("");
  const [bookResultList, setBookResultList] = useState([]);
  const limit = 50;

  const handleChangeKeyWord = (event) => {
    setKeyWord(event.target.value);
  };

  // Memoized search function
  const search = useCallback(() => {
    if (keyWord.trim() === "") {
      setBookResultList([]);
      return;
    }

    // Perform search and fetch all books in parallel
    Promise.all([
      BooksApi.search(keyWord, limit),
      BooksApi.getAll()
    ])
    .then(([listSearch, listAll]) => {
      if (listSearch && listSearch.length > 0) {
        const arrTemp = new Map(listAll.map((book) => [book.id, book.shelf]));
        listSearch.forEach((book) => {
          book.shelf = arrTemp.get(book.id) ?? "none";
        });
        setBookResultList(listSearch);
      } else {
        setBookResultList([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
      setBookResultList([]);
    });
  }, [keyWord, limit]);

  // Debounced search execution
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={handleChangeKeyWord}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {bookResultList.map((book) => (
              <BookItem book={book} key={book.id} updateList={search} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SearchBook;