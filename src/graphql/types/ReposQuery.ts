export type RepoListData = {
  repositoryCount: number;
  search: {
    repositoryCount: number;
    edges: {
      node: Repository;
    }[];
    pageInfo: PageInfo;
  };
};

export type RepoListVariables = {};
type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};

export type Repository = {
  name: string;
  url: string;
  forkCount: number;
  stargazerCount: number;
};