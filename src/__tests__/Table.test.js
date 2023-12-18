import { render, screen, waitFor } from '@testing-library/react';
import * as useFetchDataModule from '../hooks/useFetchData';
import RepositoryTable from '../Components/Table/RepositoryTable';

jest.mock('../hooks/useFetchData', () => ({
  useFetchData: jest.fn(),
}));

const mockRepositoryData = {
  repositoryCount: 2,
  search: {
    repositoryCount: 2,
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
    jest.spyOn(useFetchDataModule, 'useFetchData').mockImplementation(() => ({
      loading: false,
      error: null,
      handleLoadMore: jest.fn(),
    }));
  });

  test('renders RepositoryTable component with Repo 2', async () => {
    render(
        <RepositoryTable />
    );
    await waitFor(() => screen.getByText('Repo 2'));
    const repositoryName = screen.getByText('Repo 2');
    expect(repositoryName).toBeInTheDocument();
  });

  test('renders buttons correctly', async () => {
    render(
        <RepositoryTable />
    );
    const buttonLoadMore = screen.getByTestId('buttonLoadMore');
    expect(buttonLoadMore).toBeDisabled();
  });

  test('renders repo names as links', async () => {
    render(
        <RepositoryTable />
    );
    await waitFor(() => screen.getByText('Repo 1'));
    const repo1Link = screen.getByRole('link', { name: 'Repo 1' });
    const repo2Link = screen.getByRole('link', { name: 'Repo 2' });
    expect(repo1Link).toBeInTheDocument();
    expect(repo1Link).toHaveAttribute('href', 'https://repo1.com');
    expect(repo1Link).toHaveAttribute('target', '_blank');

    expect(repo2Link).toBeInTheDocument();
    expect(repo2Link).toHaveAttribute('href', 'https://repo2.com');
    expect(repo2Link).toHaveAttribute('target', '_blank');
  });
});
