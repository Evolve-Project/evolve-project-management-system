'use client'
import React, { useState, useMemo,useEffect } from 'react';
import "../../components/Components/usermanagement.css";
import { UserCOLUMNS } from "@/components/Components/Columns";
import userdata from "@/components/Components/userdata.json";
import { useTable, useGlobalFilter, usePagination, useSortBy } from "react-table";
import "@/components/Components/table.css";
import GlobalFilter from "@/components/Components/GlobalFilter";
import { Button } from "@/components/ui/button";
import Popup from '@/components/Components/popup';
import { useLocation,useSearchParams } from 'react-router-dom';
const UserManagement = () => {
  let columns = useMemo(() => UserCOLUMNS, []);
  let data = useMemo(() => userdata, []);
  // const [role, setRole] = useState("All");
  // const [params, setParams] = useSearchParams();
  // useEffect(() => {
  //   const roleParam = params.get("role");
  //   if (roleParam) {
  //     setRole(roleParam);
  //   }
  // }, [params]);
  const [params] = useSearchParams();
  const roleFromParams = params.get("role");
  const [role, setRole] = useState(roleFromParams || "All");
  const filteredData = useMemo(() => {
    if (role === 'All') return data;
    if (role === 'Mentor') return data.filter(user => user.role !== 'Mentee');
    return data.filter(user => user.role === role);
  }, [data, role]);
  const tableInstance = useTable(
    {
      columns,
      data: filteredData,
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
          <div className="flex items-center justify-between">
            <GlobalFilter
              filter={globalfilter}
              setfilter={setGlobalFilter}
              className="global-filter-container"
              style={{ width: 'calc(50% - 160px)', margin: '0 auto', marginBottom: '20px' }}
            />
            <select value={role} onChange={e => setRole(e.target.value)} className='mr-auto p-2 mb-2 pr-4 focus:outline-sky-700'>
              <option value="All">All</option>
              <option value="Mentee">Mentee</option>
              <option value="Mentor">Mentor</option>
            </select>
          </div>
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

export default UserManagement;

