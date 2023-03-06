import React from 'react';
import { render, screen } from '@testing-library/react';
import { Summary } from './index';
import { useTransactions } from '../../hooks/useTransactions';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../hooks/useTransactions');

describe('Summary component', () => {
  it('should render correctly', () => {
    const useTransactionsMock = useTransactions as jest.Mock;
    useTransactionsMock.mockReturnValue({
      transactions: [
        {
          id: 1,
          title: 'Salary',
          type: 'deposit',
          category: 'Job',
          amount: 5000,
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'Rent',
          type: 'withdraw',
          category: 'Home',
          amount: 1000,
          createdAt: new Date(),
        },
      ],
    });

   const { debug } = render(<Summary />);

    debug(); 

    const incomeElement = screen.getByAltText('Entradas');
    const incomeValueElement = screen.getByText('R$ 5.000,00');
    expect(incomeValueElement).toBeInTheDocument();
    expect(incomeElement).toBeInTheDocument();

    const outcomeElement = screen.getByAltText('Saídas');
    const outcomeValueElement = screen.getByText(/-\s*R\$\s*1\.000,00/i);;
    expect(outcomeElement).toBeInTheDocument();
    expect(outcomeValueElement).toBeInTheDocument();

    const totalElement = screen.getByAltText('Total');
    const totalValueElement = screen.getByText('R$ 4.000,00');
    expect(totalElement).toBeInTheDocument();
    expect(totalValueElement).toBeInTheDocument();
  });
});