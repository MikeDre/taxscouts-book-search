import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: flex;
  position: relative;
`;

const SearchInput = styled.input`
  border: 1px solid #ddd;
  padding: 10px;
`;

const SearchResults = styled.div`
  background-color: #000;
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  top: 80px;
  right: 0;
  width: 300px;

  &:before {
    content: '';
    width: 25px;
    height: 25px;
    transform: rotate(45deg) translate(-40px, 10px);
    position: absolute;
    right: 0;
    background-color: #000;
    z-index: -1;
  }

  .search-results__controls {
    display: flex;
    justify-content: space-between;

    .search-results__total {
      margin: 10px 0 0 10px;
      font-style: italic;
      font-size: 0.8rem;
    }

    .search-results__close {
      margin: 10px 0 0 10px;

      button {
        background-color: transparent;
        border: 0;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .search-results__book-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
  }

  .search-results__book-title {
    font-size: 1rem;
  }

  .search-results__container {
    max-height: 400px;
    overflow-y: scroll;
    padding-left: 10px;
    padding-right: 20px;

    a {
      color: #fff;
      text-decoration: none;
      padding-bottom: 5px;
      display: block;

      &:hover {
        text-decoration: underline;
      }
    }

    li {
      margin-bottom: 10px;
      list-style-type: none;
      border-bottom: 1px solid #ddd;
      padding-bottom: 15px;
      padding-top: 5px;
    }

    .search-results__isbn {
      font-size: 0.8rem;
    }

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #444;
    }

    &::-webkit-scrollbar-thumb {
        background: #aaa;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #ccc;
    }
  }
`;

const LoadingAnimation = styled.img`
  animation: spin 2s linear infinite;
  display: flex;
  justify-content: center;
  margin-right: 20px;

  @keyframes spin {
    0%{
      transform: rotate(0deg);
    }

    100%{
      transform: rotate(360deg);
    }
  }
`;

export { SearchWrapper, SearchInput, SearchResults, LoadingAnimation };
