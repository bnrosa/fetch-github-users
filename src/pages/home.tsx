import React, { useState, useRef } from "react";
import {Flex, Heading, Input, Button, Select, Container, Text, Spinner} from "@chakra-ui/react"
import { SEARCH_USERS, SearchUsersVars, GithubUsersSearch } from "../helpers/queries"
import { useQuery } from "@apollo/client";
import usePagination from "../hooks/usePagination/index";
import PaginationButtons from "../hooks/usePagination/PaginationButtons";
import UserTableRow from "../components/UserTableRow";

const Home = () => {  
    const [searchInput, setSearchInput] = useState("example");
    const [perPageResults, setPerPageResults] = useState(10);
    const [totalResults] = useState(100);
    const { data, loading, error } = useQuery<GithubUsersSearch, SearchUsersVars>(SEARCH_USERS, 
        {
            variables: {
                query: searchInput,
                first: totalResults
            }
        }
    );
    const { displayData, setDisplayData, currentPage, setCurrentPage, pages } = usePagination(
        data ? data.search.edges : [],
        perPageResults,
      );
    const inputEl = useRef<HTMLInputElement>(null);
    
    if(error && !data){
        console.log(error);
    }
    return (
        <Flex minHeight="100vh" justifyContent="center" background="gray.100" p={16}>
            <Container direction="column" background="white" p={8} rounded={6}>
                <Heading mb={6}>Github Users</Heading>
                <Flex direction="row" mb={2} >
                    <Flex direction="column" p={2}>
                        <Text>User name:</Text>
                        <Input placeholder="example" name="input"
                        ref={inputEl} type="text" mr={2}
                    />
                    </Flex>
                    <Flex direction="column" p={2}>
                        <Text>Per page results: </Text>
                        <Select minWidth="5rem" onChange={(e) => {setPerPageResults(Number(e.target.value));}}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </Select>
                    </Flex>  
                </Flex>
               
                <Button 
                    onClick={() => {setSearchInput(inputEl?.current?.value || "");
                    setCurrentPage(1)}}
                    type="submit"
                    background="cyan.100"
                    textColor="cyan.600"
                    boxShadow="md"
                    rounded="md"
                >
                    Search
                </Button>
                <Flex direction="column" alignItems="center">
                {loading && <Spinner p={10} mt={10} />}   
                {error && <Text>{error.message}</Text>}  
                {displayData && 
                    <section>
                        <Text my={2}>
                            This search shows <strong>{totalResults > (data?.search?.userCount || 0) ? data?.search.userCount : totalResults}</strong> of {data?.search.userCount} results 
                        </Text>
                        {displayData.map((item, index: number) => {
                            return <UserTableRow key={index} user={item} />
                        })}
                    <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />
                    </section>
                    
                }
                </Flex>  
            </Container>
        </Flex>
        
    )
}

export default Home;