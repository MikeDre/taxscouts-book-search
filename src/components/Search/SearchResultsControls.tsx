import CloseIcon from "../../assets/icons/close.svg";

type SearchResultsProps = {
  totalBooks: number;
  onClick: () => void;
};

const SearchResultsControls = ({ totalBooks, onClick }: SearchResultsProps) => {
  return (
    <div className="search-results__controls">
      <div className="search-results__total">Found {totalBooks} results:</div>
      <div className="search-results__close">
        <button onClick={onClick}>
          <img src={CloseIcon} alt="Close results" width="15" />
        </button>
      </div>
    </div>
  );
};

export default SearchResultsControls;
