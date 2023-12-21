import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Search from '../Search/Search';
import * as useFetchDataModule from '../../hooks/useFetchData';
import { FetchDataHandlers } from '../../hooks/useFetchData';
jest.mock('@apollo/client');

jest.mock('../../hooks/useFetchData', () => ({
  useFetchData: jest.fn(),
}));
describe('Search component', () => {
  beforeEach(() => {
    jest.spyOn(useFetchDataModule, 'useFetchData').mockImplementation(
      () =>
        ({
          loading: false,
        }) as unknown as FetchDataHandlers,
    );
  });

  test('renders Search component', () => {
    render(<Search />);
    const searchElement = screen.getByTestId('searchComponent');
    expect(searchElement).toBeInTheDocument();
  });

  test('button is not disabled if loading is false', async () => {
    render(<Search />);
    await waitFor(() => {
      const searchButton = screen.getByTestId('searchButton');
      expect(searchButton).not.toBeDisabled();
    });
  });

  test('button is disabled if loading is true', async () => {
    jest.spyOn(useFetchDataModule, 'useFetchData').mockImplementation(
      () =>
        ({
          loading: true,
        }) as unknown as FetchDataHandlers,
    );
    render(<Search />);
    await waitFor(() => {
      const searchButton = screen.getByTestId('searchButton');
      expect(searchButton).toBeDisabled();
    });
  });

  test('input value is updated correctly', () => {
    render(<Search />);
    const searchInput = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput).toHaveValue('test');
  });
});
