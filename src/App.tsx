import React from 'react';
import './App.css';
import TableComponent from './Components/Table/Table';
import { useQuery } from '@apollo/client';
import { POPULAR_REPOS_QUERY } from './graphql/queries/queries';
import { RepoListData, RepoListVariables } from './graphql/types/ReposQuery';
import { Repository } from './utils/types';

const App = () => {

  const { loading, error, data, fetchMore } = useQuery<RepoListData, RepoListVariables>(
    POPULAR_REPOS_QUERY,
    {
      variables: {
        first: 10,
      },
    }
  );
  const handleShowMore = () => {
    fetchMore({
      variables: { after: data?.search.pageInfo.endCursor, first: 10 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          search: {
            ...fetchMoreResult.search,
            nodes: [...prev.search.nodes, ...fetchMoreResult.search.nodes],
          },
        };
      },
    });
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const repositories = data?.search.nodes as unknown as Repository[] || [];
  return (
    <div className="App">
      <TableComponent repositories={repositories} />
      <button onClick={handleShowMore}>click</button>
    </div>
  );
}

export default App;
