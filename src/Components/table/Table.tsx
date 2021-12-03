import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { GetRequest } from "../../Utilities/NetworkAxios";

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<any>({ columns, data: usersData });

  return (
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
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
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
  );
}
export default Table;
