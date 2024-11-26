export const createData = function (
  id,
  date,
  description,
  category,
  type,
  amount
) {
  date = new Date(date);
  return { id, date, description, category, type, amount };
};

export const getColumns = function () {
  return ['Id', 'Date', 'Description', 'Category', 'Type', 'Amount'];
};

export const filterData = function (data, name) {
  if (name === 'All') return data;
  return data.filter((item) => item.type === name);
};

export const sortDataBy = function (data, col = 'id') {
  const newData = [...data];
  newData.sort((a, b) => {
    console.log(a[col], col);
    return a[col] - b[col];
  });
  return newData;
};
