import { useState, useEffect } from 'react';
import useDebounce from './hooks/use-debounce';

function App() {

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [isSearching, setisSearching] = useState(false);

  const handleAPIQuery = (query: string) => {
    // Handle search query here...
  }

  return (
    <div className="App">
        <input type="text" value={query} onChange={e => handleAPIQuery(e.target.value)} placeholder="Enter a book title..."/>

        <div className="books">
        </div>
    </div>
  )
}

export default App;
