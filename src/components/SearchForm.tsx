import React, {FC} from "react"
import {Flex, Text, Input, Select, Button} from "@chakra-ui/react"
interface SearchFormProps {
    setPerPageResults: (value: number) => void;
    setSearchInput: (value: string) => void;
    setCurrentPage: (value: number) => void;
    inputEl: React.RefObject<HTMLInputElement>;
}

const SearchForm: FC<SearchFormProps> = ({setPerPageResults, setSearchInput, setCurrentPage, inputEl}) =>{

    return (
        <>
            <Flex direction="row" mb={2} >
                <Flex direction="column" p={2}>
                    <Text>Username to search for:</Text>
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
        </>
    );
}

export default SearchForm;