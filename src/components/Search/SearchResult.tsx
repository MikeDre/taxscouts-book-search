import { handleAmazonQuery } from "../../utils/helpers";

type SearchResultProps = {
  bookTitle: string
  bookISBN: string
  bookAuthorName: string
  bookPublishYear: number
};

const SearchResult = ({
  bookTitle,
  bookISBN,
  bookAuthorName,
  bookPublishYear,
}: SearchResultProps) => {
  return (
    <li>
      <a
        className="search-results__book-title"
        href={handleAmazonQuery(bookTitle, bookAuthorName, bookPublishYear)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {bookTitle}
      </a>
      <div className="search-results__book-meta">
        <div className="search-results__author-name">{bookAuthorName}</div>
        <div className="search-results__book-year">{bookPublishYear}</div>
      </div>
    </li>
  );
};

export default SearchResult;
