import { render, screen } from '@testing-library/react';
import RepositoryTable from '../RepositoryTable/RepositoryTable';
import { POPULAR_REPOS_QUERY } from '../../graphql/queries/repositories';
import { MockedProvider } from '@apollo/client/testing';

const mockRepositoryData = {
  search: {
    edges: [
      {
        node: {
          forkCount: 40,
          name: 'Repo 1',
          url: 'https://repo1.com',
          stargazerCount: 25,
        },
      },
      {
        node: {
          forkCount: 40,
          name: 'Repo 2',
          url: 'https://repo2.com',
          stargazerCount: 25,
        },
      },
      {
        node: {
          forkCount: 40,
          name: 'Repo 3',
          url: 'https://repo3.com',
          stargazerCount: 25,
        },
      },
      {
        node: {
          forkCount: 15,
          name: 'Repo 4',
          url: 'https://repo4.com',
          stargazerCount: 50,
        },
      },
      {
        node: {
          forkCount: 22,
          name: 'Repo 5',
          url: 'https://repo5.com',
          stargazerCount: 15,
        },
      },
      {
        node: {
          forkCount: 18,
          name: 'Repo 6',
          url: 'https://repo6.com',
          stargazerCount: 40,
        },
      },
      {
        node: {
          forkCount: 33,
          name: 'Repo 7',
          url: 'https://repo7.com',
          stargazerCount: 30,
        },
      },
      {
        node: {
          forkCount: 25,
          name: 'Repo 8',
          url: 'https://repo8.com',
          stargazerCount: 20,
        },
      },
      {
        node: {
          forkCount: 28,
          name: 'Repo 9',
          url: 'https://repo9.com',
          stargazerCount: 18,
        },
      },
      {
        node: {
          forkCount: 15,
          name: 'Repo 10',
          url: 'https://repo10.com',
          stargazerCount: 22,
        },
      },
    ],
    pageInfo: {
      endCursor: 'cursor2',
      hasNextPage: true,
    },
  },
};
const mocks = [
  {
    request: {
      query: POPULAR_REPOS_QUERY,
      variables: {
        first: 10,
        query: 'language:javascript topic:react ',
      },
    },
    result: {
      data: mockRepositoryData,
    },
  },
];

describe('RepositoryTable component', () => {
  it('renders RepositoryTable component with Repo 2', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepositoryTable />
      </MockedProvider>,
    );
  
    await screen.findByTestId('repoTableComponent');
    await screen.findByText('Repo 2');
    expect(screen.getByText('Repo 2')).toBeInTheDocument();
  });

  it('renders button correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepositoryTable />
      </MockedProvider>,
    );
    const buttonLoadMore = await screen.findByTestId('buttonLoadMore');

    expect(buttonLoadMore).toBeInTheDocument();
  });

  it('renders repo names as links', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepositoryTable />
      </MockedProvider>,
    );
    await screen.findByTestId('repoTableComponent');
    const repo1Link = screen.getByRole('link', { name: 'Repo 1' });
    expect(repo1Link).toBeInTheDocument();
    expect(repo1Link).toHaveAttribute('href', 'https://repo1.com');
    expect(repo1Link).toHaveAttribute('target', '_blank');
  });

  it('renders message if loading', async () => {
    const loadingMocks = [
      {
        delay: 30,
        request: {
          query: POPULAR_REPOS_QUERY,
          variables: {
            first: 10,
            query: 'language:javascript topic:react ',
          },
        },
        result: {
          data: mockRepositoryData,
        },
      },
    ];
    render(
      <MockedProvider mocks={loadingMocks} addTypename={false}>
        <RepositoryTable />
      </MockedProvider>,
    );
    const loadingMessage = screen.getByTestId('tableMessageLoading');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders message if error', async () => {
    const errorMocks = [
      {
        request: {
          query: POPULAR_REPOS_QUERY,
          variables: {
            first: 10,
            query: 'language:javascript topic:react ',
          },
        },
        error: new Error('An error occurred'),
      },
    ];
    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <RepositoryTable />
      </MockedProvider>,
    );
    const errorMessage = await screen.findByTestId('tableMessageError');
    expect(errorMessage).toBeInTheDocument();
  });
});
