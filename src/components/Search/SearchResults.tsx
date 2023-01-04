import { Book } from "../../types/book-types";

import SearchResult from "./SearchResult";

type SearchResultsProps = {
  searchQuery: string;
  data: Book[];
  error: string | null;
};

const SearchResults = ({ searchQuery, data, error }: SearchResultsProps) => {
  console.log();

  return (
    <>
      {data.length > 0 && (
        <ol className="search-results__container">
          {data.map((book: Book, i) => (
            <SearchResult
              key={`${i}-${book.isbn}`}
              bookTitle={book.title}
              bookISBN={book.isbn}
              bookAuthorName={book.author_name}
              bookPublishYear={book.publish_year}
            />
          ))}
        </ol>
      )}

      {data.length === 0 && <div>No results found for "{searchQuery}"</div>}
      {error !== null && <div>Error: {error}</div>}
    </>
  );
};

export default SearchResults;
