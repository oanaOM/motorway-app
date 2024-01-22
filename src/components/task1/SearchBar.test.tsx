import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar component', () => {
  test('renders an input field with a placeholder text', async () => {
    render(<SearchBar />);

    const inputSearch = screen.getByRole('input');
    expect(inputSearch).toHaveAttribute('placeholder', 'Search for vehicles');
  });

  test('allows the user to search for a value', async () => {
    render(<SearchBar />);

    const inputSearch = screen.getByRole('input');
    await userEvent.type(inputSearch, 'red');

    expect(inputSearch).toHaveValue('red');
  });
});
