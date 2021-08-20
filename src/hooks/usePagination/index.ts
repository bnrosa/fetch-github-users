import { useEffect, useState } from "react";
import {UserNode} from "../../helpers/queries"
const usePagination = (data: Array<UserNode>, rowsPerPage: number) => {
  const [pages, setPages] = useState(data.length ? Math.ceil(data.length / rowsPerPage) : 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState<Array<UserNode>>([]);

  // useEffect(() => {
  //   if (data) {
  //     const start = (currentPage - 1) * rowsPerPage;
  //     const end = currentPage * rowsPerPage;
  //     setPages(Math.ceil(data.length / rowsPerPage));
  //     setDisplayData(data.slice(start, end));
  //   }
  // }, [data, rowsPerPage]);

  useEffect(() => {
    if (data) {
      const start = (currentPage - 1) * rowsPerPage;
      const end = currentPage * rowsPerPage;
      setPages(Math.ceil(data.length / rowsPerPage));
      setDisplayData(data.slice(start, end));
    }
  }, [data, currentPage, rowsPerPage]);

  return {
    displayData,
    setDisplayData,
    currentPage,
    setCurrentPage,
    pages,
  };
};

export default usePagination;
