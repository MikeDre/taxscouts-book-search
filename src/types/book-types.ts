export interface FetchedBook {
  title: string;
  author_name: string[];
  isbn: string[];
  publish_year: number[];
}
export interface FetchedBooks {
  docs: FetchedBook[];
  url: string;
}

export interface Book {
  title: string;
  author_name: string;
  isbn: string;
  publish_year: number;
}
