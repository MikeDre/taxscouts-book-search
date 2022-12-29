import { useState, useEffect } from "react";
import useDebounce from "../../hooks/use-debounce";
import { formatQuery } from "../../utils/helpers";

import { Book, FetchedBook } from "../../types/book-types";

import Input from "../UI/Input";
import SearchResults from "./SearchResults";
import SearchResultsControls from "./SearchResultsControls";

import Loading from "../../assets/icons/loading.svg";

import {
  SearchWrapper,
  SearchInput,
  SearchResultsWrapper,
  LoadingAnimation,
} from "./Search.styles";

function Search() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);

  // Debounce the query so that we don't fetch new books on every keystroke
  const debouncedQuery = useDebounce<string>(query, 500);

  useEffect(() => {   
    if (query.length > 0) {
      setIsSearching(true);
      fetchBooks(query);
    }
  }, [debouncedQuery]);

  // Handle user submitted query for Open Library API
  const handleAPIQuery = (submittedQuery: string) => {
    setQuery(submittedQuery);
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setDisplayResults(false);
  };

  // Fetch books from the Open Library API
  const fetchBooks = async (query: string) => {
    const formatedQuery = formatQuery(query);
    
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${formatedQuery}`);
      const data = await response.json();
      const fetchedBooks: FetchedBook[] = data.docs;

      setIsSearching(false);

      handleFetchedBooks(fetchedBooks);

    } catch(err) {
      setIsSearching(false);
      throw new Error(`Error fetching books: ${err}`);
    }
  };
  
  // Process fetched books for use in the app
  const handleFetchedBooks = (fetchedBooks: FetchedBook[]) => {
    let books: Book[] = [];
    
    fetchedBooks.forEach((fetchedBook) => {
      books.push({
        title: fetchedBook.title,
        author_name: "author_name" in fetchedBook ? fetchedBook.author_name[0] : "Unkown Author",
        isbn: "isbn" in fetchedBook ? fetchedBook.isbn[0] : "",
        publish_year: "publish_year" in fetchedBook ? fetchedBook.publish_year[0] : 0,
      });
    });

    setBooks(books);
    setDisplayResults(true);
  };

  return (
    <>
      <SearchWrapper>
        {isSearching && (
          <LoadingAnimation src={Loading} alt="Loading..." width="30" />
        )}

        <SearchInput>
          <Input
            type="text"
            value={query}
            onChange={(e) => handleAPIQuery(e.target.value)}
            placeholder="Enter a book title..."
          />
        </SearchInput>

        {displayResults && (
          <SearchResultsWrapper>
            <SearchResultsControls
              totalBooks={books.length}
              onClick={clearSearch}
            />
            <SearchResults data={books} />
          </SearchResultsWrapper>
        )}
      </SearchWrapper>
    </>
  );
}

export default Search;
