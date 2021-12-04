import { useEffect, useMemo, useState } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { GetRequest } from "../../Utilities/NetworkAxios";
import Mock_data from "../MOCK_DATA.json";
import "../../Assets/Style/style.css";
import { COLUMNS } from "./columns";
import GlobalFilter from "./GlobalFilter";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import GenerateQRCode from "../generateQRCode/generateQRCode";

function Table() {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await GetRequest("http://localhost:4000/rzpay/payments");
      if (!response) {
        return;
      }
      setUsers(response.data.results);
    };
    fetchUsers();
  }, []);

  const columns = useMemo(() => COLUMNS, []);

  const usersData = useMemo(() => [...users], [users]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    pageOptions,
    state,
    prepareRow,
    setGlobalFilter,
  }: any = useTable<any>(
    { columns, data: usersData },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, globalFilter }: any = state;

  return (
    <>
      <div className="container">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <Link to="/GenerateQRCode" className="link">
          GenerateQRCode
        </Link>
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroups: any) => (
            <tr {...headerGroups.getHeaderGroupProps()}>
              {headerGroups.headers.map((column: any) => (
                <th {...column.getHeaderProps([column.getSortByToggleProps()])}>
                  {column.render("Headers")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="container-pagination">
        <span className="pagination">
          Page{" "}
          <strong>
            {pageIndex + 1}of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => previousPage()}>Previous</button>
        <button onClick={() => nextPage()}>Next</button>
      </div>
    </>
  );
}
export default Table;

// {
//   "currency": "INR",
//   "order_id": "order_IT30BEhY5ZMigZ",
//   "description": "#IT300kuzQKAD00",
//   "bank": "SBIN",
//   "email": "xdankitjain@gmail.com",
//   "contact": "+917588317064",
//   "amount": 2000,
//   "createdAt": "2021-12-04T08:56:23.290Z"
// }
