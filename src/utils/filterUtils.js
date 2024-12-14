const applyFilter = (data, filterQuery) => {
  const [filterKey, filterValue] = filterQuery.split('=');
  return data.filter(item => item[filterKey] === filterValue);
};

module.exports = { applyFilter };
