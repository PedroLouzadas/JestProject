import React from 'react';
import { render, screen, fireEvent, getByAltText, act } from '@testing-library/react';
import { NewTransactionModal } from './index';
import { useTransactions } from '../../hooks/useTransactions';
import '@testing-library/jest-dom/extend-expect';
import Modal from 'react-modal';
import { TransactionsContextData } from '../../hooks/useTransactions';

jest.mock('../../hooks/useTransactions');

Modal.setAppElement(document.createElement('div'));

describe('<NewTransactionModal />', () => {

    const createTransaction = jest.fn();

    beforeEach(() => {
        (useTransactions as jest.Mock).mockReturnValue({
            createTransaction,
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should be able to create a new transaction with ""Entrada"', async () => {
        const createTransactionMock = jest.fn();
    (useTransactions as jest.Mock).mockReturnValue({
      createTransaction: createTransactionMock,
    });

    render(<NewTransactionModal isOpen onRequestClose={() => {}} />);

    const titleInput = screen.getByPlaceholderText('Título');
    const amountInput = screen.getByPlaceholderText('Valor');
    const categoryInput = screen.getByPlaceholderText('Categoria');
    const depositRadio = screen.getByText('Entrada');
    const submitButton = screen.getByText('Cadastrar');

    fireEvent.change(titleInput, { target: { value: 'Test transaction' } });
    fireEvent.change(amountInput, { target: { value: 100 } });
    fireEvent.change(categoryInput, { target: { value: 'Test category' } });
    fireEvent.click(depositRadio);
    fireEvent.click(submitButton);

    await act(async () => {
      expect(createTransactionMock).toHaveBeenCalledWith({
        title: 'Test transaction',
        amount: 100,
        category: 'Test category',
        type: 'deposit',
      });
    });


    expect(titleInput).toHaveValue('');
    expect(amountInput).toHaveValue(0);
    expect(categoryInput).toHaveValue('');
    expect(depositRadio).not.toBeChecked();
    
    });

    it('should be able to create a new transaction with ""Saida"', async () => {
        const createTransactionMock = jest.fn();
    (useTransactions as jest.Mock).mockReturnValue({
      createTransaction: createTransactionMock,
    });

    render(<NewTransactionModal isOpen onRequestClose={() => {}} />);

    const titleInput = screen.getByPlaceholderText('Título');
    const amountInput = screen.getByPlaceholderText('Valor');
    const categoryInput = screen.getByPlaceholderText('Categoria');
    const depositRadio = screen.getByText('Saída');
    const submitButton = screen.getByText('Cadastrar');

    fireEvent.change(titleInput, { target: { value: 'Test transaction' } });
    fireEvent.change(amountInput, { target: { value: 100 } });
    fireEvent.change(categoryInput, { target: { value: 'Test category' } });
    fireEvent.click(depositRadio);
    fireEvent.click(submitButton);

    await act(async () => {
      expect(createTransactionMock).toHaveBeenCalledWith({
        title: 'Test transaction',
        amount: 100,
        category: 'Test category',
        type: 'withdraw',
      });
    });


    expect(titleInput).toHaveValue('');
    expect(amountInput).toHaveValue(0);
    expect(categoryInput).toHaveValue('');
    expect(depositRadio).not.toBeChecked();
    
    });



    it('should render "Fechar modal" button and activate "onRequestClose" function when IsOpen true', () => {
        const mockOnOpenNewTransactionModal = jest.fn();
        render(
            <NewTransactionModal isOpen={true} onRequestClose={mockOnOpenNewTransactionModal} />
        );

        const button = screen.getByRole('button', { name: 'Fechar modal' });

        fireEvent.click(button);

        expect(mockOnOpenNewTransactionModal).toHaveBeenCalled();

    });

    it('should not render any elements of the modal when IsOpen is false', () => {
        const mockOnOpenNewTransactionModal = jest.fn();

        render(
            <NewTransactionModal isOpen={false} onRequestClose={mockOnOpenNewTransactionModal} />
        );

        const text = screen.queryByRole('heading', { name: 'Cadastrar informação' });

        expect(text).not.toBeInTheDocument();

    });

    it('should render the placeholders of the modal', () => {
        const mockOnOpenNewTransactionModal = jest.fn();
        render(<NewTransactionModal isOpen={true} onRequestClose={mockOnOpenNewTransactionModal} />);

        const titulo = screen.getByPlaceholderText('Título');
        const valor = screen.getByPlaceholderText('Valor');
        const categoria = screen.getByPlaceholderText('Categoria');

        expect(titulo).toBeInTheDocument();
        expect(valor).toBeInTheDocument();
        expect(categoria).toBeInTheDocument();
    });

});