export type RepoListData = {
  search: {
    edges: {
      node: Repository;
    }[];
    pageInfo: PageInfo;
  };
};

export type RepoListVariables = {
  first: number;
  query: string;
  after?: string;
};

type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};

type Repository = {
  name: string;
  url: string;
  forkCount: number;
  stargazerCount: number;
};
