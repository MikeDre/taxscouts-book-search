import { useState, useEffect } from "react";
import useDebounce from "../../hooks/use-debounce";
import useHttp from "../../hooks/use-http";
import { formatQuery } from "../../utils/helpers";

import { Book, FetchedBooks, FetchedBook } from "../../types/book-types";

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
  const [displayResults, setDisplayResults] = useState(false);

  // Debounce the query so that we don't fetch new books on every keystroke
  const debouncedQuery = useDebounce<string>(query, 500);

  const {isLoading, error, sendRequest: fetchBooks} = useHttp();

  useEffect(() => {   
    if (query.length > 0) {
      console.log(`Fetching books for query: ${query}`);
      
      fetchBooks(
        {
          url: `https://openlibrary.org/search.json?q=${handleAPIQuery(query)}`,
        },
        handleFetchedBooks
      );
      setDisplayResults(true);
    }
  }, [debouncedQuery]);

  // Handle user submitted query for Open Library API
  const handleAPIQuery = (submittedQuery: string) => {
    return formatQuery(submittedQuery);
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setDisplayResults(false);
  };

  // Process fetched books for use in the app
  const handleFetchedBooks = (fetchedBooks: FetchedBooks) => {
    const cleanedFetchedBooks: FetchedBook[] = fetchedBooks.docs;

    let books: Book[] = [];

    console.log(`Processing fetched books...`);
    cleanedFetchedBooks.forEach((fetchedBook) => {
      books.push({
        title: fetchedBook.title,
        author_name:
          "author_name" in fetchedBook
            ? fetchedBook.author_name[0]
            : "Unkown Author",
        isbn: "isbn" in fetchedBook ? fetchedBook.isbn[0] : "",
        publish_year:
          "publish_year" in fetchedBook ? fetchedBook.publish_year[0] : 0,
      });
    });

    setBooks(books);
  };

  return (
    <>
      <SearchWrapper>
        {isLoading && (
          <LoadingAnimation src={Loading} alt="Loading..." width="30" />
        )}

        <SearchInput>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a book title..."
          />
        </SearchInput>

        {displayResults && (
          <SearchResultsWrapper>
            <SearchResultsControls
              totalBooks={books.length}
              onClick={clearSearch}
            />
            <SearchResults searchQuery={query} data={books} error={error} />
          </SearchResultsWrapper>
        )}
      </SearchWrapper>
    </>
  );
}

export default Search;
