import { memo, useEffect, useMemo, useState } from "react";
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

  const fetchUsers = async () => {
    // const response = await GetRequest("https://fakestoreapi.com/Users");
    // if (!response) {
    //   return;
    // }
    setUsers(Mock_data);
  };
  console.log("Users: ", users);

  useEffect(() => {
    fetchUsers();
  }, []);

  // const data = useMemo(
  //   () => [
  //     //   {
  //     //     merchantKey: "abcd123",
  //     //     userId: "user12",
  //     //     paymentId: "ffzz44ws",
  //     //     amount: 500,
  //     //     createdAt: 22 / 22 / 22,
  //     //     status: 402,
  //     //   },
  //     {
  //       id: 1,
  //       first_name: "Goldy",
  //       last_name: "Kleinsinger",
  //       email: "gkleinsinger0@51.la",
  //       phone: "12121@51.la",
  //       currency: "Dinar",
  //     }

  //   ],
  //   []
  // );

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
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <Link to="/GenerateQRCode">GenerateQRCode</Link>

      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
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
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="btn">
        <span>
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
export default memo(Table);

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
