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
type PageInfo = {
    endCursor: String
    hasNextPage: Boolean
}