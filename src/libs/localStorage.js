export const getStoredTransactions = function () {
  const storedTransactions = localStorage.getItem('transactions');
  try {
    let transactions = JSON.parse(storedTransactions) || [];
    return transactions.map((transaction) => {
      return { ...transaction, date: new Date(transaction.date) };
    });
  } catch (e) {
    console.error('Failed to parse transactions from localstorage: ', e);
    return [];
  }
};

export const storeTransactions = function (newTransactions) {
  if (!newTransactions) {
    console.error("New transactions can't be empty");
    return;
  }
  localStorage.setItem('transactions', JSON.stringify(newTransactions));
};
