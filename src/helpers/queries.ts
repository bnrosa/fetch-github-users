import { gql } from "@apollo/client"


export interface UserNode {
    node: {
        avatarUrl: string;
        bio: string | null;
        followers: {
            totalCount: number;
        }
        following: {
            totalCount: number;
        }
        starredRepositories: {
            totalCount: number;
        }
        login: string;
        name: string;
    }
}

export interface GithubUsersSearch {
    search: {
        edges: UserNode[];
        userCount: number;
    }
}

export interface SearchUsersVars {
    first: number;
    query: string;
}
export const SEARCH_USERS = gql`
  query Search($query: String!, $first: Int!){
    search(query: $query, type: USER, first: $first){
        userCount
        edges {
            node {
                ... on User {
                    followers{
                        totalCount
                    }
                    following {
                        totalCount
                    }
                    starredRepositories {
                        totalCount
                    }
                    avatarUrl
                    bio
                    name
                    login
                }
            }
        }
    }
}`;