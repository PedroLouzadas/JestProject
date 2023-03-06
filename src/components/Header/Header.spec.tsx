import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './index'
import '@testing-library/jest-dom/extend-expect';

describe('<Header />', () => {
    it('should render the "Nova transação" button and open modal when clicked', () => {

        const mockOnOpenNewTransactionModal = jest.fn();
        render(<Header onOpenNewTransactionModal={mockOnOpenNewTransactionModal} />);
    
        const buttonElement = screen.getByText('Nova transação');
        expect(buttonElement).toBeInTheDocument();
    
        fireEvent.click(buttonElement);

        expect(mockOnOpenNewTransactionModal).toHaveBeenCalled();

    });

    it('should render logo', () => {

        render(<Header />);
    
        expect(screen.getByAltText(/dt.money/i)).toHaveAttribute('src', 'logo.svg');

    });
});