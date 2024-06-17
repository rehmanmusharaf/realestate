import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const UserTable = ({
  users,
  totalUsers,
  totalPages,
  currentPage,
  page,
  getAllUsers,
}) => {
  useEffect(() => {
    console.log("User Detail IS: ", users);
  }, []);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 style={{ fontSize: "revert" }}>Registered Users</h2>
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
            {/* <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {users?.length > 0
            ? users.map((value, index) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
          {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4">$1999</td> */}
          {/* <td className="px-6 py-4 text-right">
              <a
                href="javascript:void(0);"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td> */}
          {/* </tr>
          <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"> */}
          {/* <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th> */}
          {/* <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">$1999</td> */}

          {/* <td className="px-6 py-4 text-right">
              <a
                href="javascript:void(0);"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td> */}
          {/* </tr> */}
        </tbody>
      </table>

      {/* pagination  */}
      <div class="flex flex-col items-center">
        {/* <!-- Help text --> */}
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span class="font-semibold text-gray-900 dark:text-white">1</span> to{" "}
          <span class="font-semibold text-gray-900 dark:text-white">5</span> of{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {totalUsers}
          </span>{" "}
          Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          {/* <!-- Buttons --> */}
          {/* <button class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg
              class="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button> */}
          <button
            class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => getAllUsers(page)}
          >
            Next
            <svg
              class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
