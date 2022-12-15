import { useState, useEffect } from 'react';
import useDebounce from '../../hooks/use-debounce';
import { formatQuery } from "../../utils/helpers";

import CloseIcon from "../../assets/icons/close.svg";
import Loading from "../../assets/icons/loading.svg";

import { SearchWrapper, SearchInput, SearchResults, LoadingAnimation } from "./Search.styles";

interface Book {
  title: string;
  author_name: string[];
  isbn: string[];
  publish_year: number[];
}

function Search() {

  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce the query so that we don't fetch new books on every keystroke
  const debouncedQuery = useDebounce<string>(query, 500);

  useEffect(() => {
    setIsSearching(true);
    fetchBooks(query)
      .then(books => {
        setBooks(books);
        setIsSearching(false);
      }).catch(err => {
        console.error(err);
      });
  }, [debouncedQuery]);

  // Handle user submitted query for Open Library API
  const handleAPIQuery = (submittedQuery: string) => {  
    setQuery(submittedQuery);
  }

  // Handle query for Amazon search
  const handleAmazonQuery = (book: Book) => {
    return `https://www.amazon.co.uk/s?k=${formatQuery(book.title)}+${formatQuery(book.author_name[0])}+${book.publish_year[0]}&i=stripbooks`;
  }

  // Fetch books from the Open Library API
  const fetchBooks = async (query: string) => {
    let books: Book[] = [];

    const formatedQuery = formatQuery(query);

    const response = await fetch(`https://openlibrary.org/search.json?q=${formatedQuery}`);
    const data = await response.json();

    const fetchedBooks: Book[] = data.docs;
    
    fetchedBooks.forEach((fetchedBook) => {
      books.push({
        title: fetchedBook.title,
        author_name: [...fetchedBook.hasOwnProperty('author_name') ? fetchedBook.author_name : 'Unkown Author'],
        isbn: [...fetchedBook.hasOwnProperty('isbn') ? fetchedBook.isbn : ''],
        publish_year: [...fetchedBook.hasOwnProperty('publish_year') ? fetchedBook.publish_year as number[] : []],
      });
    });

    return books;
  }

  return (
    <> 
      <SearchWrapper>

        {isSearching && <LoadingAnimation src={Loading} alt="Loading..." width="30" />}

        <SearchInput type="text" value={query} onChange={e => handleAPIQuery(e.target.value)} placeholder="Enter a book title..." />
        {books.length > 0 && <SearchResults>
          <div className="search-results__controls">
            <div className="search-results__total">Found {books.length} results:</div>
            <div className="search-results__close">
              <button onClick={() => handleAPIQuery('')}>
                <img src={CloseIcon} alt="Close results" width="15" />
              </button>
            </div>
          </div>

          <ol className="search-results__container">
            {books.map((book: Book, i) => (
              <li key={i}>
                  <a className="search-results__book-title" href={handleAmazonQuery(book)} target="_blank" rel="noopener noreferrer">
                    {book.title}
                  </a>
                  <div className="search-results__book-meta">
                    <div className="search-results__author-name">
                    {book.author_name[0]}
                    </div>
                    <div className="search-results__book-year">
                      {book.publish_year[0]}
                    </div>
                  </div>
              </li>
            ))}
          </ol>
        </SearchResults>}
      </SearchWrapper>
    </>
  )
};

export default Search;
