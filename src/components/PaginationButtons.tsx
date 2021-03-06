import React, { FunctionComponent } from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io"
import { Button, IconButton, Text, Flex } from "@chakra-ui/react";

type PaginationButtonsProps = {
  currentPage: number;
  setCurrentPage: any;
  pages: number;
};

const CommasText: FunctionComponent<{text: string}> = ({text}) => {
  return <Text
      background="white"
      textColor="gray.500"
      _hover={{bg: "gray.50"}}
      px={2}
      mx={0.5}
      py={1.5}
      boxShadow="md"
      fontSize={{base: "0.8rem", md: "xs", lg: "sm" }}
      rounded="md"
    >
      {text}
  </Text>
}

const PaginationButtons: FunctionComponent<PaginationButtonsProps> = ({ currentPage, setCurrentPage, pages }) => {
  const isShown = (current: number, target: number, total: number) => {
    if (target === current - 1 && current - 1 > 0) {
      return true;
    }
    if (target === current + 1 && current + 1 <= total) {
      return true;
    }
    if (target === 1) {
      return true;
    }
    if (target === total) {
      return true;
    }
    if (target === current) {
      return true;
    }
    return false;
  };

  const createPaginationNumbers = (numberOfPages: number, current: number) => {
    const numbersList = Array.from({ length: numberOfPages });
    let leftElipsis = false;
    let rightElipsis = false;
    return numbersList.map((_, index) => {
      if (numberOfPages < 7 || isShown(current, index + 1, numberOfPages)) {
        return (
          <Button
            key={index}
            type="button"
            aria-current="page"
            background={currentPage === index +1 ? "cyan.100" : "white"}
            textColor={currentPage === index +1 ? "cyan.600" : "gray.500"}
            _hover={currentPage === index +1 ? {} : {bg: "gray.50"}}
            mx={0.5}
            minWidth={["0.1rem", "0.6rem", "1.5rem", "2rem"]}
            w={["0.1rem", "0.6rem", "1.5rem", "2rem"]}
            boxShadow="md"
            fontSize={{base: "0.8rem", md: "xs", lg: "sm" }}
            onClick={(e) => {
              setCurrentPage(index + 1);
              e.currentTarget.scrollIntoView()
            }}
            >
            {index + 1}
          </Button>
        );
      }
      if (!leftElipsis && current > 3) {
        leftElipsis = true;
        return (
          <CommasText text="..." key={index} />
        );
      }
      if (!rightElipsis && current < numberOfPages - 2 && index > current) {
        rightElipsis = true;
        return (
          <CommasText text="..." key={index} />
        );
      }
      return null;
    });
  };

  return (
    <Flex justifyContent="center" p={2} background="gray.50" direction="row" rounded="md" aria-label="Pagination">
      <IconButton 
          type="button"
          background="white"
          textColor="gray.500"
          _hover={{bg: "gray.50"}}
          mx={0.5}
          boxShadow="md"
          minWidth={["1.8rem", "2rem"]}
          w={["1.8rem", "2rem"]}
          fontSize={{base: "0.8rem", md: "xs", lg: "sm" }}
          onClick={(e) => {
            setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
            e.currentTarget.scrollIntoView();
          }}
          disabled={currentPage === 1}
          aria-label="Search database" icon={<IoIosArrowBack />}>
          <span className="sr-only">Previous</span>
      </IconButton>
      {createPaginationNumbers(pages, currentPage)}

      
      <IconButton type="button"
        background="white"
        textColor="gray.500"
        _hover={{bg: "gray.50"}}
        mx={0.5}
        boxShadow="md"
        minWidth={["1.8rem", "2rem"]}
        w={["1.8rem", "2rem"]}
        fontSize={{base: "0.8rem", md: "xs", lg: "sm" }}
        onClick={(e) => {
          setCurrentPage(currentPage === pages ? currentPage : currentPage + 1);
          e.currentTarget.scrollIntoView();
        }}
        disabled={currentPage === pages}
        aria-label="Search database" icon={<IoIosArrowForward />} >
          <span className="sr-only">Next</span>
      </IconButton>
    </Flex>
  );
};

export default PaginationButtons;
