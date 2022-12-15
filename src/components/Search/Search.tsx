import { useState, useEffect } from 'react';
import useDebounce from '../../hooks/use-debounce';
import { formatQuery } from "../../utils/helpers";

import { SearchWrapper, SearchInput, SearchResults } from "./Search.styles";

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
  const debouncedQuery = useDebounce<string>(query, 250);

  useEffect(() => {
    fetchBooks(query).then(books => {
      setBooks(books);
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
    if (book.isbn.length) {
      return `https://www.amazon.co.uk/s?k=${book.isbn[0]}`;
    } else {
      return `https://www.amazon.co.uk/s?k=${formatQuery(book.title)}+${formatQuery(book.author_name[0])}&i=stripbooks`;
    }
  }

  // Fetch books from the Open Library API
  const fetchBooks = async (query: string) => {
    let books: Book[] = [];

    const formatedQuery = formatQuery(query);

    const response = await fetch(`http://openlibrary.org/search.json?q=${formatedQuery}`);
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
        <SearchInput type="text" value={query} onChange={e => handleAPIQuery(e.target.value)} placeholder="Enter a book title..." />
        {books.length > 0 && <SearchResults>
          <div className="search-results__total">Found {books.length} results:</div>
          <ol className="search-results__container">
            {books.map((book: Book, i) => (
              <li key={i}>
                  <a className="search-results__book-title" href={handleAmazonQuery(book)}><strong>{book.title}</strong></a>
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
