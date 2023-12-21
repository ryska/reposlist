import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Search from '../Search/Search';
import { FetchDataHandlers } from '../../hooks/useFetchData';
import { POPULAR_REPOS_QUERY } from '../../graphql/queries/repositories';

jest.mock('../../hooks/useFetchData', () => ({
  useFetchData: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: POPULAR_REPOS_QUERY,
      variables: {
        first: 10,
        query: 'language:javascript topic:react '
      },
    },
    result: {
      data: [],
    },
  },
];

describe('Search component', () => {
  beforeEach(() => {
    jest.spyOn(require('../../hooks/useFetchData'), 'useFetchData').mockImplementation(
      () =>
        ({
          loading: false,
        } as FetchDataHandlers),
    );
  });

  test('renders Search component', () => {
    render(
      <MockedProvider mocks={mocks}>
        <Search />
      </MockedProvider>
    );
    const searchElement = screen.getByTestId('searchComponent');
    expect(searchElement).toBeInTheDocument();
  });

  test('button is not disabled if loading is false', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Search />
      </MockedProvider>
    );
    await waitFor(() => {
      const searchButton = screen.getByTestId('searchButton');
      expect(searchButton).not.toBeDisabled();
    });
  });

  test('button is disabled if loading is true', async () => {
    jest.spyOn(require('../../hooks/useFetchData'), 'useFetchData').mockImplementation(
      () =>
        ({
          loading: true,
        } as FetchDataHandlers),
    );
    render(
      <MockedProvider mocks={mocks}>
        <Search />
      </MockedProvider>
    );
    await waitFor(() => {
      const searchButton = screen.getByTestId('searchButton');
      expect(searchButton).toBeDisabled();
    });
  });

  test('input value is updated correctly', () => {
    render(
      <MockedProvider mocks={mocks}>
        <Search />
      </MockedProvider>
    );
    const searchInput = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput).toHaveValue('test');
  });
});
