const parseNumber = (number, defaultNumber) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultNumber;
  const parsedNumder = parseInt(number);
  if (Number.isNaN(parsedNumder)) return defaultNumber;
  console.log(parseNumber);

  return parsedNumder;
};

export const parsePaginationParams = query => {
  const { page, perPage } = query;
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);
  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};