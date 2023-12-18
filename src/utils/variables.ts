import { makeVar } from '@apollo/client';
import { RepoListData } from '../graphql/types/Repositories';

export const repositoriesVar = makeVar<RepoListData>({
  search: {
    edges: [
      {
        node: {
          name: '',
          stargazerCount: 0,
          forkCount: 0,
          url: '',
        },
      },
    ],
    pageInfo: {
      endCursor: '',
      hasNextPage: true,
    },
  },
});

export const searchValueVar = makeVar<string>('');
