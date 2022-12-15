export const formatQuery = (preformatedQuery: string) => {
  const formattedQuery = preformatedQuery.replace(/\s/g, '+');

  return formattedQuery;
}
