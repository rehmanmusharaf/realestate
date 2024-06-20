import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const YourProperties = (
  {
    // totalPages2,
    // currentPage2,
    // getListing,
    // listings,
    // page2,
  }
) => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState("");
  const [totalListings, setTotalListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState(0);
  const dispatch = useDispatch();

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error("Unauthorized");
        return;
      }
      setTotalListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      toast.success("Listing Deleted Successfully");
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // admin function
  const updateListingAvailability = async (available, id) => {
    try {
      const { data } = await axios.post(
        `/api/listing/update/${id}`,
        { available: available },
        { withCredentials: true }
      );
      // if (data.success != true) {
      //   console.log(data);
      //   toast.error("Something Went Wrong");
      //   return;
      // }
      // setFilteredListings(prevListings =>
      //   prevListings.map(listing =>
      //     listing._id === id ? { ...listing, available } : listing
      //   )
      // );
      console.log("updated listing", data);
      toast.success("property Updated Successfully");
      setTimeout(() => {
        window.location.reload("/");
      }, 2000);
      // setMessage(`Listing updated successfully: ${response.data}`);
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log("error is: ", error);
      // setMessage(`Error updating listing: ${error.response?.data?.message || error.message}`);
    }
  };
  const getUserListings = async () => {
    try {
      console.log("current user is: ", currentUser);
      const { data } = await axios.get(
        `/api/user/listings/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );
      console.log("your own listing data is : ", data);
      // let listingarr = data.listings;
      setTotalListings([...data]);
      // data = [1, 2];
      let length = data.length;
      console.log("length is: ", length);
      setListings(length);

      setLoading(false);
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log("error at your own liasting is: ", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserListings();
  }, []);
  const filteredListings = totalListings.filter((listing) =>
    listing.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12 mb-3">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-2xl font-semibold w-1/2">
          Your Registered Properties For Sale - {listings}
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
          </div>
        </form>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Bedrooms
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
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredListings &&
            filteredListings?.map((value, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {value.name}
                </th>
                <td className="px-6 py-4">{value.bedrooms}</td>
                <td className="px-6 py-4">{value.bathrooms}</td>
                <td className="px-6 py-4">{value.type}</td>
                <td
                  className="px-6 py-4 "
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    updateListingAvailability(!value.available, value._id)
                  }
                >
                  {value.available ? "Available" : "NotAvailable"}
                </td>

                {/* <button data-tooltip-target="tooltip-default" type="button" class="">Default tooltip</button> */}

                {/* <div
                id="tooltip-default"
                role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Tooltip content
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div> */}

                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/listing/${value._id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Click here
                  </Link>
                </td>
                <td
                  className="px-6 py-4 text-red-600 cursor-pointer"
                  onClick={() => handleListingDelete(value._id)}
                >
                  Delete
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* pagination Table  */}
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {/* {currentPage2} */}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {listings}
          </span>{" "}
          Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            // onClick={() => getListing(page2)}
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

export default YourProperties;
