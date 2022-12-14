import { useState, useEffect } from 'react';
import useDebounce from './hooks/use-debounce';

function App() {

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce the query so that we don't fetch new books on every keystroke
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    fetchBooks(query).then(books => {
      setBooks(books);
    });
  }, [debouncedQuery]);

  // Handle user submitted query for Open Library API
  const handleAPIQuery = (submittedQuery: string) => {  
    setQuery(submittedQuery);
  }

  // Format query for API / Search engines
  const formatQuery = (preformatedQuery: string) => {
    const formattedQuery = preformatedQuery.replace(/\s/g, '+');
  
    return formattedQuery;
  }

  // Fetch books from the Open Library API
  const fetchBooks = async (query: string) => {
    let books = [];
  
    const formatedQuery = formatQuery(query);

    const response = await fetch(`http://openlibrary.org/search.json?q=${formatedQuery}`);
    const data = await response.json();

    return books;
  }


  return (
    <div className="App">
        <input type="text" value={src/App.tsx} onChange={e => handleAPIQuery(e.target.value)} placeholder="Enter a book title..."/>

        <div className="books">
        </div>
    </div>
  )
}

export default App;
