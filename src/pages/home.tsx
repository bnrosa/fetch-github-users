import React, { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import {Flex, Heading, Input, Button, Select, Container, Text} from "@chakra-ui/react"

type GithubResponse = {
    incomplete_results: boolean,
    items: any[],
    total_count: number
}
const Home = () => {
    const fetcher = (query: string ) => fetch(`https://api.github.com/search/users${query}`).then(res => res.json());
    
    const [searchInput, setSearchInput] = useState("");
    const [searchOrder, setSearchOrder] = useState("desc");
    const inputEl = useRef<HTMLInputElement>(null);
    const { data, error, mutate } = useSWR<GithubResponse, any>(searchInput ?
        `?q=${searchInput}&order=${searchOrder}` : null,
        fetcher
    );
    useEffect(() => {
        if(data){
            console.log(data)
        }
    }, [data]);
    return (
        <Flex height="100vh" justifyContent="center" background="gray.100" p={16}>
            <Container direction="column" background="white" p={8} rounded={6}>
                <Heading mb={6}>Github Users</Heading>
                <Flex direction="row" mb={2} >
                    <Flex direction="column" p={2}>
                        <Text>User name:</Text>
                        <Input placeholder="user-search" name="input"
                        ref={inputEl} type="text" mr={2}
                    />
                    </Flex>   
                    <Flex direction="column" p={2}>
                        <Text>Order: </Text>
                        <Select onChange={(e) => {setSearchOrder(e.target.value); mutate();}}>
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </Select>
                    </Flex>   
                </Flex>
                <Button onClick={() => {setSearchInput(inputEl?.current?.value || ""); mutate(); }} type="submit">Search</Button>
                    {data?.items && data.items.map(item => {
                        return <Text p={4} mb={2}>{item.login}</Text>
                    })}
            </Container>
        </Flex>
        
    )
}

export default Home;