
import React, { useState, useMemo } from 'react';
import "../../components/Components/usermanagement.css";
import { UserCOLUMNS } from "@/components/Components/Columns";
import userdata from "@/components/Components/userdata.json";
import { useTable, useGlobalFilter, usePagination, useSortBy } from "react-table";
import "@/components/Components/table.css";
import GlobalFilter from "@/components/Components/GlobalFilter";
import { Button } from "@/components/ui/button";
import Popup from '@/components/Components/popup';

const Projects = () => {
  let columns = useMemo(() => UserCOLUMNS, []);
  let data = useMemo(() => userdata, []);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
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

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getRowDetails = row => {
    setSelectedUser(row.original);
    setOpen(true);
  };

  return (
    <div>
      <div className="container">
        <div className="title"> User Management</div>
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
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} onClick={() => getRowDetails(row)}>
                      {row.cells.map((cell) => {
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
          {open && <Popup user={selectedUser} onClose={() => setOpen(false)} />}
        </>
      </div>
    </div>
  )
}

export default Projects;