import React, { FunctionComponent } from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io"
import { Button, IconButton, Text, Flex } from "@chakra-ui/react";

type PaginationButtonsProps = {
  currentPage: number;
  setCurrentPage: any;
  pages: number;
};

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
            type="button"
            aria-current="page"
            background={currentPage === index +1 ? "cyan.100" : "white"}
            textColor={currentPage === index +1 ? "cyan.600" : "gray.500"}
            _hover={currentPage === index +1 ? {} : {bg: "gray.50"}}
            px={4}
            mx={0.5}
            py={2}
            boxShadow="md"
            fontSize="sm"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        );
      }
      if (!leftElipsis && current > 3) {
        leftElipsis = true;
        return (
          <Text
            background="white"
            textColor="gray.500"
            _hover={{bg: "gray.50"}}
            px={4}
            mx={0.5}
            py={2}
            boxShadow="md"
            fontSize="sm"
            rounded="md"
          >
            ...
          </Text>
        );
      }
      if (!rightElipsis && current < numberOfPages - 2 && index > current) {
        rightElipsis = true;
        return (
          <Text
            background="white"
            textColor="gray.500"
            _hover={{bg: "gray.50"}}
            px={4}
            mx={0.5}
            py={2}
            boxShadow="md"
            fontSize="sm"
            rounded="md"
          >
            ...
          </Text>
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
          px={4}
          mx={0.5}
          py={2}
          boxShadow="md"
          fontSize="sm"
          onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Search database" icon={<IoIosArrowBack />}>
          <span className="sr-only">Previous</span>
      </IconButton>
      {createPaginationNumbers(pages, currentPage)}

      
      <IconButton type="button"
        background="white"
        textColor="gray.500"
        _hover={{bg: "gray.50"}}
        px={4}
        mx={0.5}
        py={2}
        boxShadow="md"
        fontSize="sm"
        onClick={() => setCurrentPage(currentPage === pages ? currentPage : currentPage + 1)}
        disabled={currentPage === pages}
        aria-label="Search database" icon={<IoIosArrowForward />} >
          <span className="sr-only">Next</span>
      </IconButton>
    </Flex>
  );
};

export default PaginationButtons;
