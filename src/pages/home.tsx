import React, { useState, useRef, useEffect } from "react";
import {Flex, Heading, Container, Text, Spinner} from "@chakra-ui/react"
import { SEARCH_USERS, SearchUsersVars, GithubUsersSearch } from "../helpers/queries"
import { useQuery } from "@apollo/client";
import PaginationButtons from "../components/PaginationButtons";
import UserTableRow from "../components/UserTableRow";
import SearchForm from "../components/SearchForm";

const totalResults = 100;

const Home = () => {  
    const [searchInput, setSearchInput] = useState("example");
    const [perPageResults, setPerPageResults] = useState(10);
    
    const { data, loading, error } = useQuery<GithubUsersSearch, SearchUsersVars>(SEARCH_USERS, 
        {
            variables: {
                query: searchInput,
                first: totalResults
            }
        }
    );
    const [pages, setPages] = useState(data?.search.edges.length ? Math.ceil(data?.search.edges.length / perPageResults) : 1);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState<Array<any>>([]);

    useEffect(() => {
        if (data) {
        const start = (currentPage - 1) * perPageResults;
        const end = currentPage * perPageResults;
        setPages(Math.ceil(data?.search.edges.length / perPageResults));
        setDisplayData(data?.search.edges.slice(start, end));
        }
    }, [data, currentPage, perPageResults]);

    const inputEl = useRef<HTMLInputElement>(null);
    
    if(error && !data){
        console.log(error);
    }
    return (
        <Flex minHeight="100vh" justifyContent="center" background="gray.100" p={16}>
            <Container maxWidth="45vw" direction="column" background="white" p={8} rounded={6}>
                <Heading mb={6}>Github Users</Heading>
                <SearchForm inputEl={inputEl}
                    setSearchInput={setSearchInput}
                    setPerPageResults={setPerPageResults}
                    setCurrentPage={setCurrentPage}
                />
                <Flex direction="column" alignItems="center">
                {loading && <Spinner p={10} mt={10} />}   
                {error && 
                    <Text my="4" textAlign="center" w="full" rounded="md"
                        bg="red.100" textColor="red.600" fontWeight="bold" p={4}>
                    {error.message}
                    </Text>
                }  
                {!error && displayData && 
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