export const getStoredTransactions = function () {
  const storedTransactions = localStorage.getItem('transactions');
  try {
    return JSON.parse(storedTransactions) || [];
  } catch (e) {
    console.error('Failed to parse transactions from localstorage: ', e);
    return [];
  }
};

export const storeTransactions = function (newTransactions) {
  localStorage.setItem('transactions', JSON.stringify(newTransactions));
};
