export const fetchSuccess = (professionals) => {
  return {
    type: "FETCH_SUCCESS",
    professionals,
  };
};

export const updateQuery = (query) => {
  return {
    type: "UPDATE_QUERY",
    query,
  };
};

export const updateFilter = (filter) => {
  return {
    type: "UPDATE_FILTER",
    filter,
  };
};
