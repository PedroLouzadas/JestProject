import { render, screen, fireEvent } from '@testing-library/react';
import { Dashboard } from './index'
import '@testing-library/jest-dom/extend-expect';

jest.mock('../Summary/index', () => ({
    Summary: () => <div data-testid="summary-component">Summary mock component</div>
}));

jest.mock('../TransactionTable/index', () => ({
    TransactionTable: () => <div data-testid="transaction-table-component">Transaction table mock component</div>
}));

jest.mock('../../hooks/useTransactions', () => ({
    useTransactions: () => ({
        transactions: [
            {
                id: 1,
                title: 'Transaction 1',
                amount: 100,
                type: 'deposit',
                category: 'Category 1',
                createdAt: new Date(),
            },

            {
                id: 2,
                title: 'Transaction 2',
                amount: 200,
                type: 'withdraw',
                category: 'Category 2',
                createdAt: new Date(),
            },
        ],
    }),
}));

describe('<Dashboard />', () => {
    it('should renders summary and transaction', () => {
        render(<Dashboard />);

        expect(screen.getByTestId('summary-component')).toBeInTheDocument();
        expect(screen.getByTestId('transaction-table-component')).toBeInTheDocument();
    });
});