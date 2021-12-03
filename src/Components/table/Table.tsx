import { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import { GetRequest } from "../../Utilities/NetworkAxios";
// import "./Assets/Style/style.css";

function Table() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await GetRequest("https://fakestoreapi.com/Users");

    if (!response) {
      return;
    }

    setUsers(response);
  };
  console.log("Users: ", users);

  useEffect(() => {
    fetchUsers();
  }, []);

  const data = useMemo(
    () => [
      //   {
      //     merchantKey: "abcd123",
      //     userId: "user12",
      //     paymentId: "ffzz44ws",
      //     amount: 500,
      //     createdAt: 22 / 22 / 22,
      //     status: 402,
      //   },
      {
        id: 1,
        email: "john@gmail.com",
        username: "johnd",
        password: "m38rmF$",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "username",
        accessor: "username",
      },
      {
        Header: "password",
        accessor: "password",
      },
      //   {
      //     Header: "merchantKey",
      //     accessor: "merchantKey",
      //   },
      //   {
      //     Header: "userId",
      //     accessor: "userId",
      //   },
      //   {
      //     Header: "paymentId",
      //     accessor: "paymentId",
      //   },
      //   {
      //     Header: "amount",
      //     accessor: "amount",
      //   },
      //   {
      //     Header: "createdAt",
      //     accessor: "createdAt",
      //   },
      //   {
      //     Header: "status",
      //     accessor: "status",
      //   },
    ],
    []
  );

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
  } = useTable<any>({ columns, data: usersData }, usePagination);

  const { pageIndex }: any = state;

  return (
    <>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
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
export default Table;
