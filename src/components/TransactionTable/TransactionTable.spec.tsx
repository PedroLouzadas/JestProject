import { render, screen } from '@testing-library/react';
import { TransactionTable } from './index';
import '@testing-library/jest-dom/extend-expect';


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

describe('<TransactionTable />', () => {

  it('should render all table columns', async () => {
    render(
      <TransactionTable />
    );

    const titleElement = screen.getByText('Título');
    const valueElement = screen.getByText('Valor');
    const categoryElement = screen.getByText('Categoria');
    const dateElement = screen.getByText('Data');

    expect(titleElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
  });

  it('renders a table with transaction data', () => {
    const { getByText } = render(<TransactionTable />);


    expect(getByText('Transaction 1')).toBeInTheDocument();
    expect(getByText('R$ 100,00')).toBeInTheDocument();
    expect(getByText('Category 1')).toBeInTheDocument();
    expect(getByText('Transaction 2')).toBeInTheDocument();
    expect(getByText('R$ 200,00')).toBeInTheDocument();
    expect(getByText('Category 2')).toBeInTheDocument();

  });


});