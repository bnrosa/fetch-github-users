import React, { useState, useRef, useEffect } from "react";
import {Flex, Heading, Container } from "@chakra-ui/react"
import { SEARCH_USERS, SearchUsersVars, GithubUsersSearch } from "../helpers/queries"
import { useQuery } from "@apollo/client";
import SearchForm from "../components/SearchForm";
import UserTable from "../components/UserTable";

const totalResults = 100;

const Home = () => {  
    const [searchInput, setSearchInput] = useState("example");
    const [perPageResults, setPerPageResults] = useState(10);
    
    const { data, loading, error, refetch } = useQuery<GithubUsersSearch, SearchUsersVars>(SEARCH_USERS, 
        {
            variables: {
                query: searchInput,
                first: totalResults
            },
            notifyOnNetworkStatusChange: true
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
            <Container w="95vw" direction="column" background="white" p={8} rounded={6}>
                <Heading mb={6}>Find Github Users by Username 🕵🏽‍♂️</Heading>
                <SearchForm inputEl={inputEl}
                    setSearchInput={setSearchInput}
                    setPerPageResults={setPerPageResults}
                    setCurrentPage={setCurrentPage}
                />
                <Flex direction="column" alignItems="center">
                    <UserTable loading={loading}
                        error={error}
                        displayData={displayData}
                        refetch={refetch}
                        totalResults={totalResults}
                        data={data}
                        pages={pages}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </Flex>  
            </Container>
        </Flex>
        
    )
}

export default Home;