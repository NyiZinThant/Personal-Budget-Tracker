import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getStoredTransactions,
  storeTransactions,
} from '../../src/libs/localStorage';
describe('getStoredTransactions', () => {
  afterEach(() => {
    localStorage.clear();
  });
  it("should return empty array if don't have transactions in localStorage", () => {
    expect(getStoredTransactions()).toEqual([]);
  });
  it('should return array of transaction if transactions exist', () => {
    const date = new Date();
    const transactions = [
      {
        id: 1,
        date,
        description: 'testing transaction',
        category: 'salary',
        type: 'income',
        amount: 100,
      },
    ];
    localStorage.setItem('transactions', JSON.stringify(transactions));
    expect(getStoredTransactions()).toEqual(transactions);
  });
});

describe('storeTransactions', () => {
  afterEach(() => {
    localStorage.clear();
  });
  it('should return undefined with console.error if new transactions are empty', () => {
    const errorSpy = vi.spyOn(console, 'error');
    expect(storeTransactions()).toBe(undefined);
    expect(errorSpy).toHaveBeenCalled();
  });
  it('should store new transactions in localStorage', () => {
    const date = new Date();
    const transactions = [
      {
        id: 1,
        date,
        description: 'testing transaction',
        category: 'salary',
        type: 'income',
        amount: 100,
      },
    ];
    storeTransactions(transactions);
    expect(getStoredTransactions()).toEqual(transactions);
  });
});
