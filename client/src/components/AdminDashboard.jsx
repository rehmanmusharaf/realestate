import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Chart } from "chart.js";
// import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./AdminFiles/Bargraph";
import PieChartComponent from "./AdminFiles/PieGraph";
import UserTable from "./AdminFiles/UserTable";
import PropertiesTable from "./AdminFiles/PropertiesTable";
import PropertyForm from "./AdminFiles/PropertyForm";
import axios from "axios";
import CreateListing from "../pages/CreateListing";
import YourProperties from "./AdminFiles/YourProerties";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state.user);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState("");
  const [count, setCount] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [totalListings, setTotalListings] = useState([]);
  const [totalPages2, setTotalPages2] = useState(0);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [loading2, setLoading2] = useState(false);
  const [usersCount, setUsersCount] = useState(null);
  const [rentListingCount, setRentListingCount] = useState(0);
  const [saleListingCount, setSaleListingCount] = useState(0);
  const [saleNotAvailableCount, setSaleNotAvailableCount] = useState(0);
  const [rentNotAvailableCount, setRentNotAvailableCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  let [page, setPage] = useState(1);
  let [page2, setPage2] = useState(1);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const filterDropdown = (e) => {
    setDropdownSearch(e.target.value.toUpperCase());
  };

  async function getAllUsers(page = 1) {
    try {
      if (page <= 0 || (totalPages != 0 && page > totalPages)) {
        return;
      }
      console.log("page iis:", page);
      setPage((prev) => {
        return 1 + prev;
      });
      // page = page;
      // setPage(page);
      setLoading(true);
      const { data } = await axios.get(`/api/user/getallusers?page=${page}`);
      console.log("data is: ", data);
      let arr = data.users;
      setUsers((prevUsers) => {
        return [...prevUsers, ...data.users];
      });
      setTotalUsers(data.totalUsers);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setUsersCount(data.userCounts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const getListing = async (page2 = 1) => {
    try {
      console.log("get LIsting Function Run!");
      if (page2 <= 0 || (totalPages2 != 0 && page2 > totalPages)) {
        return;
      }
      console.log("page iis:", page2);
      setPage2((prev) => {
        return 1 + prev;
      });
      setLoading2(true);
      const { data } = await axios.get(
        `/api/listing/getlisting?page=${page2}`,
        { withCredentials: true }
      );
      console.log("list data is: ", data);

      // Extract listing IDs from the current state
      const currentListingIds = new Set(
        totalListings.map((listing) => listing._id)
      );
      const newUniqueListings = data.listings.filter(
        (listing) => !currentListingIds.has(listing._id)
      );

      setTotalListings((prev) => {
        return [...prev, ...newUniqueListings];
      });
      setTotalPages2(data.totalPages);
      setCurrentPage2(data.currentPage);
      setListings(data.totalListings);
      setRentListingCount(data.rentlistingcount);
      setSaleListingCount(data.salelistingcount);
      setSaleNotAvailableCount(data.salenotavailablecount);
      setRentNotAvailableCount(data.rentnotavailablecount);
      setRevenue(data.salesamount);
      // console.log(
      //   "listing availability count ",
      //   data.rentlistingcount,
      //   data.salelistingcount,
      //   data.saleavailablecount,
      //   data.rentavailablecount
      // );
      setLoading2(false);
    } catch (error) {
      console.error("Error fetching listings:", error);
      // setError(error.message);
      setLoading2(false);
    }
  };
  // Call the function to get users

  useEffect(() => {
    if (currentUser.role == "admin") {
      getAllUsers(page);
      getListing();
    }
  }, []);

  return (
    <div className="bg-gray-800 font-sans leading-normal tracking-normal">
      <main>
        <div className="flex flex-col md:flex-row">
          <nav aria-label="alternative nav">
            <div className="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">
              <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                  <li className="mr-3 flex-1 mt-5">
                    {/* <a
                      href="#"
                      className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                    > */}
                    <i className="fas fa-tasks pr-0 md:pr-3"></i>
                    <span
                      className="pb-1 md:pb-0 text-2xl md:text-base text-gray-400 md:text-gray-200 block md:inline-block "
                      onClick={() => setCount(1)}
                      style={{ fontSize: "", cursor: "pointer" }}
                    >
                      Dashboard
                    </span>
                    {/* </a> */}
                  </li>
                  <li className="mr-3 flex-1 mt-5">
                    {/* <a
                      href="#"
                      className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"
                    > */}
                    <i className="fa fa-envelope pr-0 md:pr-3"></i>
                    <span
                      className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block"
                      onClick={() => setCount(2)}
                      style={{ cursor: "pointer" }}
                    >
                      Add Property
                    </span>
                    {/* </a> */}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {count == 1 ? (
            <section className="w-full lg:w-4/5">
              <div
                id="main"
                className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5"
              >
                <div className="bg-gray-800 pt-3">
                  <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h1 className="font-bold pl-2">Analytics</h1>
                  </div>
                </div>
                {currentUser.role == "admin" && (
                  <>
                    <div className="flex flex-wrap">
                      <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        <MetricCard
                          title="Total Revenue"
                          value={`$ ${revenue && revenue}`}
                          changeIcon="fas fa-caret-up"
                          bgColor="bg-gradient-to-b from-green-200 to-green-100"
                          borderColor="border-green-600"
                          icon="fa-wallet"
                          iconBg="bg-green-600"
                        />
                      </div>
                      <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        <MetricCard
                          title="Total Users"
                          value={totalUsers && totalUsers}
                          changeIcon="fas fa-exchange-alt"
                          bgColor="bg-gradient-to-b from-pink-200 to-pink-100"
                          borderColor="border-pink-500"
                          icon="fa-users"
                          iconBg="bg-pink-600"
                        />
                      </div>
                      <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        <MetricCard
                          title="Properties Registered"
                          value={listings && listings}
                          changeIcon="fas fa-caret-up"
                          bgColor="bg-gradient-to-b from-yellow-200 to-yellow-100"
                          borderColor="border-yellow-600"
                          icon="fa-user-plus"
                          iconBg="bg-yellow-600"
                        />
                      </div>
                      {/* <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                    <MetricCard
                      title="New Users"
                      value="2"
                      changeIcon="fas fa-caret-up"
                      bgColor="bg-gradient-to-b from-yellow-200 to-yellow-100"
                      borderColor="border-yellow-600"
                      icon="fa-user-plus"
                      iconBg="bg-yellow-600"
                    />
                  </div>
                  <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                    <MetricCard
                      title="New Users"
                      value="2"
                      changeIcon="fas fa-caret-up"
                      bgColor="bg-gradient-to-b from-yellow-200 to-yellow-100"
                      borderColor="border-yellow-600"
                      icon="fa-user-plus"
                      iconBg="bg-yellow-600"
                    />
                  </div>
                  <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                    <MetricCard
                      title="New Users"
                      value="2"
                      changeIcon="fas fa-caret-up"
                      bgColor="bg-gradient-to-b from-yellow-200 to-yellow-100"
                      borderColor="border-yellow-600"
                      icon="fa-user-plus"
                      iconBg="bg-yellow-600"
                    />
                  </div> */}

                      <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        <h2>Properties Pending vs Sold-out</h2>
                        {loading2 ? (
                          <div
                            role="status "
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <svg
                              aria-hidden="true"
                              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <PieChartComponent
                            addedProperties={
                              ((saleListingCount - saleNotAvailableCount) /
                                saleListingCount) *
                              100
                            }
                            soldProperties={
                              (saleNotAvailableCount / saleListingCount) * 100
                            }
                            propertytype="Property Sold-out"
                          />
                        )}

                        {/* <PieGraph /> */}
                      </div>
                      <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        <h2>Properties Pending vs rent-out</h2>
                        {loading2 ? (
                          <div
                            role="status "
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <svg
                              aria-hidden="true"
                              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <PieChartComponent
                            addedProperties={
                              ((rentListingCount - rentNotAvailableCount) /
                                rentListingCount) *
                              100
                            }
                            soldProperties={
                              (rentNotAvailableCount / rentListingCount) * 100
                            }
                            propertytype="Property rent-out"
                          />
                        )}
                        {/* <PieGraph /> */}
                      </div>
                      <div className="w-full md:w-1/2 xl:w-1/2 p-6">
                        {usersCount && (
                          <BarChartComponent
                            April={usersCount?.twoMonthsAgo}
                            May={usersCount?.lastMonth}
                            June={usersCount?.currentMonth}
                          />
                        )}
                      </div>
                      {/* <div className="w-full md:w-1/2 xl:w-1/3 p-6"></div> */}
                    </div>
                    {loading ? (
                      <div
                        role="status "
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <UserTable
                        page={page}
                        getAllUsers={getAllUsers}
                        users={users}
                        totalUsers={totalUsers}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setUsers={setUsers}
                      />
                    )}
                    {loading2 ? (
                      <div
                        role="status "
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <PropertiesTable
                        setTotalListings={setTotalListings}
                        totalListings={totalListings}
                        totalPages2={totalPages2}
                        currentPage2={currentPage2}
                        listings={listings}
                        setListings={setListings}
                        page2={page2}
                        getListing={getListing}
                      />
                    )}
                  </>
                )}
                <YourProperties />
              </div>
            </section>
          ) : (
            <section className="w-full lg:w-4/5">
              <div
                id="main"
                className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5"
              >
                <div className="bg-gray-800 pt-3">
                  <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h1 className="font-bold pl-2">Add Property</h1>
                  </div>
                </div>
                <div className="p-5">
                  <CreateListing />
                  {/* <PropertyForm /> */}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

const MetricCard = ({
  title,
  value,
  changeIcon,
  bgColor,
  borderColor,
  icon,
  iconBg,
}) => {
  return (
    <div
      className={`bg-white border-b-4 ${borderColor} rounded-lg shadow-xl p-5`}
    >
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <div className={`rounded-full p-5 ${iconBg}`}>
            <i className={`fa ${icon} fa-2x fa-inverse`}></i>
          </div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h5 className="font-bold uppercase text-gray-500">{title}</h5>
          <h3 className="font-bold text-3xl">
            {value}{" "}
            <span className={`text-green-500`}>
              <i className={`fas ${changeIcon}`}></i>
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
