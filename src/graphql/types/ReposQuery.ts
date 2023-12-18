export type RepoListData = {
  repositoryCount: number;
  search: {
    repositoryCount: number;
    edges: {
      cursor: string;
      node: Repository;
    }[];
    pageInfo: PageInfo;
  };
};

export type RepoListVariables = {};
type PageInfo = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type Repository = {
  name: string;
  url: string;
  forkCount: number;
  stargazerCount: number;
};