import { useState, useEffect } from 'react';
import useDebounce from './hooks/use-debounce';

interface Book {
    title: string;
    author_name: string[];
    isbn: string[];
    publish_year: number[];
}

function App() {

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [isSearching, setisSearching] = useState(false);

  // Debounce the query so that we don't fetch new books on every keystroke
  const debouncedQuery = useDebounce<string>(query, 250);

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

  // Handle query for Amazon search
  const handleAmazonQuery = (book: Book) => {
    if (book.isbn.length) {
      return `https://www.amazon.co.uk/s?k=${book.isbn[0]}`;
    } else {
      return `https://www.amazon.co.uk/s?k=${formatQuery(book.title)}+${formatQuery(book.author_name[0])}&i=stripbooks`;
    }
  }

  // Fetch books from the Open Library API
  const fetchBooks = async (query: string) => {
    let books: Book[] = [];
  
    const formatedQuery = formatQuery(query);

    const response = await fetch(`http://openlibrary.org/search.json?q=${formatedQuery}`);
    const data = await response.json();

    const fetchedBooks: Book[] = data.docs;
    
    fetchedBooks.forEach((fetchedBook) => {
      books.push({
        title: fetchedBook.title,
        author_name: [...fetchedBook.hasOwnProperty('author_name') ? fetchedBook.author_name : 'Unkown Author'],
        isbn: [...fetchedBook.hasOwnProperty('isbn') ? fetchedBook.isbn : ''],
        publish_year: [...fetchedBook.hasOwnProperty('publish_year') ? fetchedBook.publish_year as number[] : []],
      });
    });

    return books;
  }

  return (
    <div className="App">
        <input type="text" value={query} onChange={e => handleAPIQuery(e.target.value)} placeholder="Enter a book title..."/>

        <div>
          {books.map((book: Book, i) => (
            <div className="book" key={i}>
              <div>
                <a href={handleAmazonQuery(book)}>
                  <strong><span>{i + 1}.</span> {book.title}</strong>
                </a>
              </div>
              <div>{book.author_name[0]}</div>
              <div>{book.isbn[0]}</div>
              {book.publish_year && <div>{book.publish_year[0]}</div>}
            </div>
          ))}
        </div>
    </div>
  )
}

export default App;
