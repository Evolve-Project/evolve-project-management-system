import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import { COLUMNS } from "@/components/AdminComponents/Columns";
import MOCK_DATA from "@/components/AdminComponents/MOCK_DATA.json";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import "@/styles/table.css";
import GlobalFilter from "@/components/AdminComponents/GlobalFilter";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import "@/styles/title.css"
const DashboardAdmin = () => {

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
    <div className="container">
        <div className="title" style={{fontSize:'40px', marginBottom:'10px'}}>Dashboard</div>
      <div className="flex text-center pb-7 pt-2">
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
          <Link to="/usermanagement?role=Mentor" className="text-violet-700 flex items-center">
  All Mentors 
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right ml-2" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
  </svg>
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
          <Link to="/usermanagement?role=Mentee" className="text-violet-700 flex items-center">
  All Mentee 
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right ml-2" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
  </svg>
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
          <Link to="/projects" className="text-violet-700 flex items-center">
  All Projects  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right ml-2" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
  </svg>
              </Link>
          </CardFooter>
        </Card>
      </div>
      <>
        <GlobalFilter
          filter={globalfilter}
          setfilter={setGlobalFilter}
          className="global-filter-container "
          style={{ width: 'calc(100% - 160px)', margin: '0 auto', marginBottom: '20px'}}
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
      </div>
    </>
  );
};
export default DashboardAdmin;
