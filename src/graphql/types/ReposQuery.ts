export type RepoListData = {
  search: {
    nodes: {
      name: string;
      url: string;
      forkCount: number;
      stargazerCount: number;
    }[];
    pageInfo: PageInfo;
  };
};

export type RepoListVariables = {};
export type PageInfo = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
