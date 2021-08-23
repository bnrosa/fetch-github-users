import { ApolloError, ApolloQueryResult } from '@apollo/client'
import React, {FC} from 'react'
import PaginationButtons from "../components/PaginationButtons";
import UserTableRow from "../components/UserTableRow";
import {Flex, Text, Spinner, Button} from "@chakra-ui/react"
import { GithubUsersSearch, SearchUsersVars } from '../helpers/queries';

interface UserTableProps {
    error: ApolloError | undefined;
    loading: boolean;
    displayData: any[];
    refetch: (variables?: Partial<SearchUsersVars> | undefined) => Promise<ApolloQueryResult<GithubUsersSearch>>;
    totalResults: number;
    data: GithubUsersSearch | undefined;
    pages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    currentPage: number;
}

const UserTable: FC<UserTableProps> = ({
    loading,
    error,
    displayData,
    refetch,
    totalResults,
    data,
    pages,
    setCurrentPage,
    currentPage,
}) => {
    if(loading) return <Spinner p={10} mt={10} />;
    if(error) return <Flex justifyContent="space-around" my="2" textAlign="center" w="full" rounded="md" bg="red.100" p={2}>
        <Text textColor="red.600" fontWeight="bold" p={2}>
            {error.message}
        </Text>
        <Button onClick={() =>refetch()}> Retry</Button>    
    </Flex>
    return (
        <section>   
            <Text my={2}>
                This search shows <strong>{totalResults > (data?.search?.userCount || 0) ? data?.search.userCount : totalResults}</strong> of {data?.search.userCount} results 
            </Text>
            {displayData.map((item, index: number) => {
                return <UserTableRow key={index} user={item} />
            })}
            <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />
        </section>
    )
}

export default UserTable;