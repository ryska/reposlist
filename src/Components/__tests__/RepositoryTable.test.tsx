import { render, screen } from '@testing-library/react';
import RepositoryTable from '../RepositoryTable/RepositoryTable';
import { POPULAR_REPOS_QUERY } from '../../graphql/queries/repositories';
import { MockedProvider } from '@apollo/client/testing';

const mockRepositoryData = {
  search: {
    edges: [
      {
        node: {
          // id: 'repo1',
          forkCount: 40,
          name: 'Repo 1',
          url: 'https://repo1.com',
          stargazerCount: 25,
          __typename: 'Repository',
        },
        __typename: 'SearchResultItemEdge',
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
  it('renders RepositoryTable component with 10 rows', async () => {
    render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          query: { errorPolicy: 'all' },
          watchQuery: { errorPolicy: 'all' },
          mutate: { errorPolicy: 'all' },
        }}
      >
        <RepositoryTable />
      </MockedProvider>,
    );
    const rows = await screen.findAllByTestId('repoTableRow');
    expect(rows).toHaveLength(10);
  });

  it('renders button correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename>
        <RepositoryTable />
      </MockedProvider>,
    );
    const buttonLoadMore = await screen.findByTestId('buttonLoadMore');

    expect(buttonLoadMore).toBeInTheDocument();
  });

  it.only('renders repo names as links', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepositoryTable />
      </MockedProvider>,
    );
    await screen.findByTestId('repoTableComponent');
    await screen.findByTestId('repoTableComponent');
    const repoTableRowNames = screen.getAllByTestId('repoTableRowName');
    repoTableRowNames.forEach((repoTableRowName) => {
      const nestedAnchorElement = repoTableRowName.querySelector('a');
      console.log('repoTableRowName', repoTableRowName.outerHTML);
      expect(nestedAnchorElement).toBeInTheDocument();
    });
    console.log('container', container.outerHTML);
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
            first: 22,
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
