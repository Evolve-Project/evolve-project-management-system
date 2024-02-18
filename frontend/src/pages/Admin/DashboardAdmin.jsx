import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import { COLUMNS } from "@/components/Components/Columns";
import MOCK_DATA from "@/components/Components/MOCK_DATA.json";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import "@/components/Components/table.css";
import GlobalFilter from "@/components/Components/GlobalFilter";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
const DashboardAdmin = () => {
  console.log("ok");
  let columns = useMemo(() => COLUMNS, []);
  let data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;
  const { globalfilter, pageIndex, pageSize } = state;
  return (
    <>
    <div >
      <div className="flex text-center pb-8 pt-12">
        <Card className="w-60 mr-20 ml-40 ">
          <CardHeader>
            <CardTitle>Total Mentor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center h-full">
              <p className="text-4xl">45</p>
            </div>
          </CardContent>
          <CardFooter>
          <Link to="/usermanagement?role=Mentor" className="text-violet-700">
                All Mentors -&gt;
              </Link>
          </CardFooter>
        </Card>
        <Card className="w-60 mr-20">
          <CardHeader>
            <CardTitle>Total Mentee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center h-full">
              <p className="text-4xl">145</p>
            </div>
          </CardContent>
          <CardFooter>
          <Link to="/usermanagement?role=Mentee" className="text-violet-700">
                All Mentee -&gt;
              </Link>
          </CardFooter>
        </Card>
        <Card className="w-60">
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center h-full">
              <p className="text-4xl">25</p>
            </div>
          </CardContent>
          <CardFooter>
            <p className=" text-violet-700">All Projects -&gt;</p>
          </CardFooter>
        </Card>
      </div>
      <>
        <GlobalFilter
          filter={globalfilter}
          setfilter={setGlobalFilter}
          className="global-filter-container"
          style={{ width: 'calc(100% - 160px)', margin: '0 auto', marginBottom: '20px' }}
        />
        <div style={{ width: 'calc(100% - 160px)', margin: '0 auto' }} >
        <table {...getTableProps()} className="custom-table">
          <thead>
            {headerGroups.map((headerGroups) => (
              <tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((rows) => {
              prepareRow(rows);
              return (
                <tr {...rows.getRowProps()}>
                  {rows.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination-container">
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="pagination-button"
          >
            Previous
          </Button>
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="pagination-button"
          >
            Next
          </Button>
          </div>
        </div>
      </>
      </div>
    </>
  );
};
export default DashboardAdmin;
