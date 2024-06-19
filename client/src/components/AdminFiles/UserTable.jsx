import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTable = ({
  users,
  totalUsers,
  totalPages,
  currentPage,
  page,
  getAllUsers,
  setUsers,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [originalUsers, setOriginalUsers] = useState([...users]);

  useEffect(() => {
    console.log("User Detail IS: ", users);
    // setOriginalUsers([...users]);
  }, [users]);

  const handleSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
    setSearchInput(searchString);
    if (searchString === "") {
      console.log("if COnditio run and original array: ", originalUsers);
      setUsers(originalUsers);
    } else {
      const filteredUsers = originalUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(searchString) ||
          user.email.toLowerCase().includes(searchString)
      );
      setUsers(filteredUsers);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between items-center flex-wrap">
        <h2 style={{ fontSize: "revert", width: "50%" }}>
          Registered Users- {totalUsers}
        </h2>
        <form className="max-w-md mx-auto w-1/2">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search listings..."
              value={searchInput}
              onChange={handleSearchChange}
              required
            />
            {/* <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button> */}
          </div>
        </form>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Picture
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0
            ? users.map((value, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{value?.username}</td>
                    <td className="px-6 py-4">{value.email}</td>
                    <td className="px-6 py-4">
                      <Link to={`/editprofile/${value._id}`}>
                        <img
                          className="rounded-full"
                          src={value?.avatar}
                          alt="image description"
                          height={"30px"}
                          width={"30px"}
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">1</span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">5</span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalUsers}
          </span>{" "}
          Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => getAllUsers(page)}
          >
            Next
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
