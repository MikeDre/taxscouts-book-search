import { useState, useEffect } from "react";
import useDebounce from "../../hooks/use-debounce";
import { formatQuery } from "../../utils/helpers";

import { Book, FetchedBook } from "../../types/book-types";

import Input from "../UI/Input";
import SearchResults from "./SearchResults";

import CloseIcon from "../../assets/icons/close.svg";
import Loading from "../../assets/icons/loading.svg";

import {
  SearchWrapper,
  SearchInput,
  SearchResultsWrapper,
  LoadingAnimation,
} from "./Search.styles";

function Search() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce the query so that we don't fetch new books on every keystroke
  const debouncedQuery = useDebounce<string>(query, 500);

  useEffect(() => {
    console.log("Fetching books...");
    setIsSearching(true);
    fetchBooks(query)
      .then((books) => {
        setBooks(books);
        setIsSearching(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [debouncedQuery]);

  // Handle user submitted query for Open Library API
  const handleAPIQuery = (submittedQuery: string) => {
    setQuery(submittedQuery);
  };

  // Fetch books from the Open Library API
  const fetchBooks = async (query: string) => {
    let books: Book[] = [];

    console.log(`Querying for books with title: "${query}"`);
    const formatedQuery = formatQuery(query);
    
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${formatedQuery}`
      );
      const data = await response.json();
      
      const fetchedBooks: FetchedBook[] = data.docs;
      
      fetchedBooks.forEach((fetchedBook) => {
        books.push({
          title: fetchedBook.title,
          author_name: "author_name" in fetchedBook ? fetchedBook.author_name[0] : "Unkown Author",
          isbn: "isbn" in fetchedBook ? fetchedBook.isbn[0] : "",
          publish_year: "publish_year" in fetchedBook ? fetchedBook.publish_year[0] : 0,
        });
      });

    return books;
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

        {books.length > 0 && (
          <SearchResultsWrapper>
            <div className="search-results__controls">
              <div className="search-results__total">
                Found {books.length} results:
              </div>
              <div className="search-results__close">
                <button onClick={() => setQuery("")}>
                  <img src={CloseIcon} alt="Close results" width="15" />
                </button>
              </div>
            </div>
            <SearchResults data={books} />
          </SearchResultsWrapper>
        )}
      </SearchWrapper>
    </>
  );
}

export default Search;
