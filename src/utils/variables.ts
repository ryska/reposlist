import { makeVar } from '@apollo/client';
import { RepoListData } from '../graphql/types/ReposQuery';

export const repositoriesVar = makeVar<RepoListData>({
  repositoryCount: 0,
  search: {
    repositoryCount: 0,
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
