export const formatQuery = (preformatedQuery: string) => {
  const formattedQuery = preformatedQuery.trim().replace(/\s/g, '+');

  return formattedQuery;
}

// Handle query for Amazon search
export const handleAmazonQuery = (title: string, authorName: string, publishYear: number) => {
  return `https://www.amazon.co.uk/s?k=${formatQuery(title)}+${formatQuery(authorName)}+${publishYear}&i=stripbooks`;
}
