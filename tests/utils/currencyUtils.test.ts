import { describe, expect, it, vi } from 'vitest';
import {
  calcPercentage,
  getFinancialSummary,
} from '../../src/utils/currencyUtils';
import Transaction from '../../src/models/transaction';

describe('calcPercentage', () => {
  it('should log error if value is null', () => {
    const spyError = vi.spyOn(console, 'error');
    // @ts-expect-error expected number
    calcPercentage(null, 100);
    expect(spyError).toHaveBeenCalled();
  });
  it('should log error if total is null', () => {
    const spyError = vi.spyOn(console, 'error');
    // @ts-expect-error expected 2 arguments
    calcPercentage(100);
    expect(spyError).toHaveBeenCalled();
  });
  it('should log error if both total and value is null', () => {
    const spyError = vi.spyOn(console, 'error');
    // @ts-expect-error expected 2 arguments
    calcPercentage();
    expect(spyError).toHaveBeenCalled();
  });
  it('should log error if value is greater than total', () => {
    const spyError = vi.spyOn(console, 'error');
    calcPercentage(100, 10);
    expect(spyError).toHaveBeenCalled();
  });
  it('should return percentage', () => {
    expect(calcPercentage(10, 100)).toBe(10);
  });
});
describe('getFinancialSummary', () => {
  it('should log error if data is empty', () => {
    const spyError = vi.spyOn(console, 'error');
    // @ts-expect-error expected 1 arguments
    expect(getFinancialSummary()).toEqual({
      totalSaving: 0,
      totalExpenses: 0,
      totalIncomes: 0,
    });
    expect(spyError).toHaveBeenCalled();
  });
  it('should return empty values summary if data is invalid', () => {
    expect(getFinancialSummary([])).toEqual({
      totalSaving: 0,
      totalExpenses: 0,
      totalIncomes: 0,
    });
  });
  it('should return financial summary', () => {
    const data: Transaction[] = [
      {
        id: '1',
        date: new Date('2024-12-01'),
        description: 'Grocery shopping',
        category: 'Food',
        type: 'Expense',
        amount: 50.75,
      },
      {
        id: '2',
        date: new Date('2024-12-01'),
        description: 'weekly salary',
        category: 'Salary',
        type: 'Income',
        amount: 1500.0,
      },
      {
        id: '3',
        date: new Date('2024-12-02'),
        description: 'Electricity bill',
        category: 'Utilities',
        type: 'Expense',
        amount: 120.5,
      },
    ];
    expect(getFinancialSummary(data)).toEqual({
      totalSaving: 1328.75,
      totalExpenses: 171.25,
      totalIncomes: 1500.0,
    });
  });
});
