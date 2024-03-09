
import React, { useState, useMemo,useEffect } from 'react';
import "@/styles/title.css";
import { UserCOLUMNS } from "@/components/AdminComponents/Columns";
import { useTable, useGlobalFilter, usePagination, useSortBy,useRowSelect } from "react-table";
import "@/styles/table.css";
import GlobalFilter from "@/components/AdminComponents/GlobalFilter";
import { Button } from "@/components/ui/button";
import Popup from '@/components/AdminComponents/popup';
import { useLocation,useSearchParams } from 'react-router-dom'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "../../styles/dropdown.css";
import { Addmentee } from '@/components/forms/addnewmentee';
import { Addmentor } from '@/components/forms/addnewmentor';
import { Bulkmentee, Bulkmentor } from '@/components/forms/bulkusers';
import axios from "axios";
import { Checkbox } from '@/components/ui/checkbox';

const UserManagement = () => {
  const [userdata, setuserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user-management-table"
        );
        const mentors = response.data.mentors.map(mentor => ({ ...mentor, role: 'Mentor' }));
        const mentees = response.data.mentees.map(mentee => ({ ...mentee, role: 'Mentee' }));
        setuserData([...mentors, ...mentees]);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
  
    fetchData();
  }, []);  
  let columns =  UserCOLUMNS;
  let data =  userdata;
  const [params] = useSearchParams();
  const roleFromParams = params.get("role");
  const [role, setRole] = useState(roleFromParams || "All");
  const filteredData = useMemo(() => {
    if (role === 'All') return data;
    if (role === 'Mentor') return data.filter(user => user.role !== 'Mentee');
    return data.filter(user => user.role === role);
  }, [data, role]);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const handleCheckboxClick = () => {
    setIsDeleteActive(true);
  };
  const tableInstance = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} onClick={handleCheckboxClick}/>
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
        },
        ...columns
      ])
    }
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
    selectedFlatRows,
    toggleRowSelected
  } = tableInstance;

  const { globalfilter, pageIndex, pageSize } = state;
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getRowDetails = row => {
    setSelectedUser(row.original);
    setOpen(true);
  };
  
  const dropdownTriggerRef = React.useRef(null);
  const focusRef = React.useRef(null);
  useEffect(() => {
    console.log(
      JSON.stringify(
        {
          selectedFlatRows: selectedFlatRows.map(row => row.original)
        },
        null,
        2
      )
    );
  }, [selectedFlatRows]);
  // Function to handle delete button click
const handleDeleteClick = async () => {
  if (window.confirm('Are you sure you want to delete the selected users?')) {
    for (const row of selectedFlatRows) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/user/${row.original.email}`);//example api 
        console.log(response.data);
        // Update your state here to remove the user from the table
      } catch (error) {
        console.error(`Error deleting user ${row.original.email}:`, error);
      }
    }
  }
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
            <div className='mr-20 '>
            <Button bonClick={handleDeleteClick} disabled={!isDeleteActive} className="bg-red-600">Delete</Button>
            <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="Button violet">Add Users</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
        <DropdownMenu.Group>
          <DropdownMenu.Label className="DropdownMenuLabel">Add Individual User</DropdownMenu.Label>
          <DialogItem triggerChildren="Mentor">
            <Dialog.Title className="DialogTitle">Add Mentor</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              <Addmentor/>
            </Dialog.Description>
          </DialogItem>

          <DialogItem triggerChildren="Mentee">
            <Dialog.Title className="DialogTitle">Add Mentee</Dialog.Title>
            <Dialog.Description className="DialogDescription">
            <Addmentee/>
            </Dialog.Description>
          </DialogItem>
        </DropdownMenu.Group>

        <DropdownMenu.Separator className="DropdownMenuSeparator" />
        <DropdownMenu.Group>
          <DropdownMenu.Label className="DropdownMenuLabel">Add Bulk Users</DropdownMenu.Label>
          <DialogItem triggerChildren="Mentor">
            <Dialog.Title className="DialogTitle">Mentor</Dialog.Title>
            <Dialog.Description className="DialogDescription">
             <Bulkmentor/>
            </Dialog.Description>
          </DialogItem>

          <DialogItem triggerChildren="Mentee">
            <Dialog.Title className="DialogTitle">Mentee</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              <Bulkmentee/>
            </Dialog.Description>
          </DialogItem>
        </DropdownMenu.Group>
        <DropdownMenu.Arrow className="DropdownMenuArrow" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    </div>
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
                          <td{...cell.getCellProps()}>
                          {cell.column.id === 'selection' ? (
                            <Checkbox
                              {...row.getToggleRowSelectedProps()}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleRowSelected(row.index);
                              }}
                            />
                          ) : (
                            cell.render("Cell")
                          )}</td>
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
const DialogItem = React.forwardRef((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } = props;
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <DropdownMenu.Item
          {...itemProps}
          ref={forwardedRef}
          className="DropdownMenuItem"
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          {triggerChildren}
        </DropdownMenu.Item>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          {children}
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default UserManagement;

