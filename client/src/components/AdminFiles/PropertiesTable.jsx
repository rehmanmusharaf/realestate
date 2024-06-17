import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PropertiesTable = ({
  totalListings,
  totalPages2,
  currentPage2,
  getListing,
  listings,
  page2,
}) => {
  const handleListingDelete = async (listingId) => {
    try {
      console.log("Product Id:", listingId);
      // const res = await fetch(`/api/listing/delete/${listingId}`, {
      //   method: "DELETE",
      // });
      // const data = await res.json();
      // if (data.success === false) {
      //   console.log(data.message);
      //   return;
      // }
      // setUserListings((prev) =>
      //   prev.filter((listing) => listing._id !== listingId)
      // );
      toast.success("Toast RUN");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12 mb-3">
      <h2 style={{ fontSize: "revert" }}>Registered Properties For Sale</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              name
            </th>
            <th scope="col" className="px-6 py-3">
              bedrooms
            </th>
            <th scope="col" className="px-6 py-3">
              Bathrooms
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Available
            </th>
            <th scope="col" className="px-6 py-3">
              Check Detail
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Check Detail
            </th> */}
          </tr>
        </thead>
        <tbody>
          {totalListings?.map((value, index) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {/* <Link> */}
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {value.name}
                </th>
                <td className="px-6 py-4">{value.bedrooms}</td>
                <td className="px-6 py-4">{value.bathrooms}</td>
                <td className="px-6 py-4">
                  {/* {value.description.slice(0, 6)}... */}
                  {value.type}
                </td>
                <td className="px-6 py-4">No</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/listing/${value._id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Click here
                    {/* {value.address.slice(0, 6)}... */}
                  </Link>
                </td>
                <td
                  className="px-6 py-4"
                  onClick={() => handleListingDelete(value._id)}
                >
                  Delete
                  {/* {value.description.slice(0, 6)}... */}
                  {/* {value.type} */}
                </td>
                {/* </Link> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* pagination Table  */}
      <div class="flex flex-col items-center">
        {/* <!-- Help text --> */}
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {currentPage2}
          </span>{" "}
          to <span class="font-semibold text-gray-900 dark:text-white">10</span>{" "}
          of{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {listings}
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
            onClick={() => getListing(page2)}
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

export default PropertiesTable;
