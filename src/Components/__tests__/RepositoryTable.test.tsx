import { render, screen } from '@testing-library/react';
import * as useFetchDataModule from '../../hooks/useFetchData';
import RepositoryTable from '../RepositoryTable/RepositoryTable';
import { FetchDataHandlers } from '../../hooks/useFetchData';

jest.mock('../../hooks/useFetchData', () => ({
  useFetchData: jest.fn(),
}));

const mockRepositoryData = {
  search: {
    edges: [
      {
        node: {
          forkCount: 20,
          name: 'Repo 1',
          url: 'https://repo1.com',
          stargazerCount: 10,
        },
      },
      {
        node: {
          forkCount: 30,
          name: 'Repo 2',
          url: 'https://repo2.com',
          stargazerCount: 70,
        },
      },
    ],
    pageInfo: {
      endCursor: 'cursor2',
      hasNextPage: false,
    },
  },
};

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  gql: jest.fn((strings) => strings[0]),
  makeVar: () => {},
  useReactiveVar: () => mockRepositoryData,
}));

describe('RepositoryTable component', () => {
  beforeEach(() => {
    jest.spyOn(useFetchDataModule, 'useFetchData').mockImplementation(
      () =>
        ({
          loading: false,
          error: null,
          handleLoadMore: jest.fn(),
        }) as unknown as FetchDataHandlers,
    );
  });

  test('renders RepositoryTable component with Repo 2', async () => {
    render(<RepositoryTable />);
    const repositoryName = await screen.findByText('Repo 2');
    expect(repositoryName).toBeInTheDocument();
  });

  test('renders button correctly', async () => {
    render(<RepositoryTable />);
    const buttonLoadMore = screen.getByTestId('buttonLoadMore');
    expect(buttonLoadMore).toBeDisabled();
  });

  test('renders repo names as links', async () => {
    render(<RepositoryTable />);
    const repo1Link = screen.getByRole('link', { name: 'Repo 1' });
    const repo2Link = screen.getByRole('link', { name: 'Repo 2' });
    expect(repo1Link).toBeInTheDocument();
    expect(repo1Link).toHaveAttribute('href', 'https://repo1.com');
    expect(repo1Link).toHaveAttribute('target', '_blank');

    expect(repo2Link).toBeInTheDocument();
    expect(repo2Link).toHaveAttribute('href', 'https://repo2.com');
    expect(repo2Link).toHaveAttribute('target', '_blank');
  });

  test('renders message if loading', async () => {
    jest.spyOn(useFetchDataModule, 'useFetchData').mockImplementation(
      () =>
        ({
          loading: true,
        }) as unknown as FetchDataHandlers,
    );
    render(<RepositoryTable />);
    const loadingMessage = screen.getByTestId('tableMessageLoading');
    expect(loadingMessage).toBeInTheDocument();
  });

  test('renders message if error', async () => {
    jest.spyOn(useFetchDataModule, 'useFetchData').mockImplementation(
      () =>
        ({
          loading: false,
          error: true,
        }) as unknown as FetchDataHandlers,
    );
    render(<RepositoryTable />);
    const errorMessage = screen.getByTestId('tableMessageError');
    expect(errorMessage).toBeInTheDocument();
  });
});
