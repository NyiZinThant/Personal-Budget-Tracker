import { describe, expect, it, vi } from 'vitest';
import {
  createData,
  getExpensesChartData,
  getMonthlyExpenses,
} from '../../src/utils/dataUtils';
import stc from 'string-to-color';
import Transaction from '../../src/models/transaction';
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mocked-uuid'),
}));
vi.mock('string-to-color');
describe('createData', () => {
  it('should throw new error if one of the data is missing', () => {
    expect(
      // @ts-expect-error expected 6 arguments
      () => createData('1', '2024-11-11', 'testing 1', 'Salary', 'Income')
    ).toThrow(/invalid/i);
  });
  it('should return transaction object', () => {
    expect(
      createData('1', '2024-11-11', 'testing 1', 'Salary', 'Income', 1500)
    ).toEqual({
      id: '1',
      date: new Date('2024-11-11'),
      description: 'testing 1',
      category: 'Salary',
      type: 'Income',
      amount: 1500,
    });
  });
});
describe('getMonthlyExpenses', () => {
  it('should log error if data is null', () => {
    const spyError = vi.spyOn(console, 'error');
    // @ts-expect-error expected 1 arguments
    getMonthlyExpenses();
    expect(spyError).toHaveBeenCalled();
  });
  it('should return monthly expense', () => {
    const data: Transaction[] = [
      {
        id: '1',
        date: new Date('2024-01-15'),
        description: 'Rent payment',
        category: 'Housing',
        type: 'Expense',
        amount: 1200.0,
      },
      {
        id: '2',
        date: new Date('2024-02-10'),
        description: 'Car maintenance',
        category: 'Transport',
        type: 'Expense',
        amount: 300.5,
      },
      {
        id: '3',
        date: new Date('2024-02-20'),
        description: 'Internet bill',
        category: 'Utilities',
        type: 'Expense',
        amount: 60.0,
      },
      {
        id: '4',
        date: new Date('2024-08-05'),
        description: 'Grocery shopping',
        category: 'Food',
        type: 'Expense',
        amount: 250.75,
      },
      {
        id: '5',
        date: new Date('2024-10-25'),
        description: 'Gym membership',
        category: 'Health',
        type: 'Expense',
        amount: 45.0,
      },
    ];
    expect(getMonthlyExpenses(data)).toEqual([
      {
        value: 1200.0,
        month: 'Jan',
      },
      {
        value: 360.5,
        month: 'Feb',
      },
      {
        value: 0,
        month: 'Mar',
      },
      {
        value: 0,
        month: 'Apr',
      },
      {
        value: 0,
        month: 'May',
      },
      {
        value: 0,
        month: 'June',
      },
      {
        value: 0,
        month: 'July',
      },
      {
        value: 250.75,
        month: 'Aug',
      },
      {
        value: 0,
        month: 'Sept',
      },
      {
        value: 45.0,
        month: 'Oct',
      },
      {
        value: 0,
        month: 'Nov',
      },
      {
        value: 0,
        month: 'Dec',
      },
    ]);
  });
});

describe('getExpensesChartData', () => {
  vi.mocked(stc).mockImplementation((str) => 'mocked-color-' + str);
  const data: Transaction[] = [
    {
      id: '1',
      date: new Date('2024-01-15'),
      description: 'Rent payment',
      category: 'Housing',
      type: 'Expense',
      amount: 1200.0,
    },
    {
      id: '2',
      date: new Date('2024-02-10'),
      description: 'Car maintenance',
      category: 'Transport',
      type: 'Expense',
      amount: 300.5,
    },
    {
      id: '3',
      date: new Date('2024-02-20'),
      description: 'Internet bill',
      category: 'Utilities',
      type: 'Expense',
      amount: 60.0,
    },
    {
      id: '4',
      date: new Date('2024-08-05'),
      description: 'Grocery shopping',
      category: 'Food',
      type: 'Expense',
      amount: 250.75,
    },
    {
      id: '5',
      date: new Date('2024-10-25'),
      description: 'Gym membership',
      category: 'Health',
      type: 'Expense',
      amount: 45.0,
    },
  ];

  const totalVal = 1856.25;
  it('should return chart data', () => {
    const result = getExpensesChartData(data, totalVal);
    const expected = [
      {
        id: 'mocked-uuid',
        label: 'Housing',
        value: +((1200.0 / 1856.25) * 100).toFixed(2),
        color: 'mocked-color-Housing',
      },
      {
        id: 'mocked-uuid',
        label: 'Transport',
        value: +((300.5 / 1856.25) * 100).toFixed(2),
        color: 'mocked-color-Transport',
      },
      {
        id: 'mocked-uuid',
        label: 'Utilities',
        value: +((60.0 / 1856.25) * 100).toFixed(2),
        color: 'mocked-color-Utilities',
      },
      {
        id: 'mocked-uuid',
        label: 'Food',
        value: +((250.75 / 1856.25) * 100).toFixed(2),
        color: 'mocked-color-Food',
      },
      {
        id: 'mocked-uuid',
        label: 'Health',
        value: +((45.0 / 1856.25) * 100).toFixed(2),
        color: 'mocked-color-Health',
      },
    ];
    expect(result).toEqual(expected);
  });
  it('should return empty array and log error if data or totalValue is null', () => {
    const spyError = vi.spyOn(console, 'error');
    // @ts-expect-error expected Transaction[]
    expect(getExpensesChartData(null, 120)).toEqual([]);
    expect(spyError).toHaveBeenCalled();
    spyError.mockClear();
    // @ts-expect-error expected 2 arguments
    expect(getExpensesChartData(data)).toEqual([]);
    expect(spyError).toHaveBeenCalled();
  });
  it('should return empty array and log error if total value is less than or equal 0', () => {
    const spyError = vi.spyOn(console, 'error');
    expect(getExpensesChartData(data, 0)).toEqual([]);
    expect(spyError).toHaveBeenCalled();
  });
});
