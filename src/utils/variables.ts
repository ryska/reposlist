import { makeVar } from '@apollo/client';
import { RepoListData } from '../graphql/types/ReposQuery';

export const repositoriesVar = makeVar<RepoListData>({
    search: {
        nodes: [],
        pageInfo: {
            startCursor: "", endCursor: "", hasNextPage: true, hasPreviousPage: false
        }
    }
});
export const pageVar = makeVar<number>(1);
export const searchValueVar = makeVar<string>("");