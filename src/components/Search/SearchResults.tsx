import { Book } from "../../types/book-types";

import SearchResult from "./SearchResult";

type SearchResultsProps = {
  data: Book[];
};

const SearchResults = ({ data }: SearchResultsProps) => {
  return (
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
  );
};

export default SearchResults;
