import { makeVar } from '@apollo/client';
import { RepoListData } from '../graphql/types/ReposQuery';

export const repositoriesVar = makeVar<RepoListData>({
  repositoryCount: 0,
  search: {
    repositoryCount: 0,
    edges: [
      {
        cursor: '',
        node: {
          name: '',
          stargazerCount: 0,
          forkCount: 0,
          url: '',
        },
      },
    ],
    pageInfo: {
      startCursor: '',
      endCursor: '',
      hasNextPage: true,
      hasPreviousPage: false,
    },
  },
});
export const searchValueVar = makeVar<string>('');
