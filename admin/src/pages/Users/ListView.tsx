import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import moment from "moment";
import * as XLSX from "xlsx";
import Modal from "Common/Components/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";

// Icons
import { Search, CheckCircle, Loader, Download } from "lucide-react";
import { ToastContainer } from "react-toastify";
import filterDataBySearch from "Common/filterDataBySearch";
import axios from "axios";
import toast from "react-hot-toast";

const UsersTable = () => {
  const [userList, setUserList] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<any>([]);

  useEffect(() => {
    handleFetchUsers();
  }, []);

  useEffect(() => {
    setUser(userList);
  }, [userList]);

  const toggle = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const validation = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URI}/auth/register`,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data) {
          toggle();
          handleFetchUsers();
        }
        toast.success("User added successfully");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  });

  // fetch data
  const handleFetchUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/auth/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserList(res.data);
      setUserList((prev: any) => {
        return prev.map((item: any) => {
          return {
            ...item,
            createdAt: moment(item.createdAt).format("DD MMMM, YYYY"),
          };
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search Data
  const filterSearchData = (e: any) => {
    const search = e.target.value;
    const keysToSearch = ["name", "_id", "email"];
    filterDataBySearch(userList, search, keysToSearch, setUser);
  };

  // columns
  const Status = ({ item }: any) => {
    switch (item) {
      case true:
        return (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent inline-flex items-center status">
            <CheckCircle className="size-3 mr-1.5" />
            Verified
          </span>
        );
      case false:
        return (
          <span className="px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded border bg-orange-100 border-transparent text-orange-500 dark:bg-orange-500/20 dark:text-orange-200 dark:border-transparent status">
            <Loader className="size-3 mr-1.5" />
            Pending
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent inline-flex items-center status">
            <CheckCircle className="size-3 mr-1.5" />
            Unknown
          </span>
        );
    }
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <div className="flex items-center h-full">
            <input
              id="CheckboxAll"
              className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800 cursor-pointer"
              type="checkbox"
            />
          </div>
        ),
        enableSorting: false,
        id: "checkAll",
        cell: (cell: any) => {
          return (
            <div className="flex items-center h-full">
              <input
                id="Checkbox1"
                className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800 cursor-pointer"
                type="checkbox"
              />
            </div>
          );
        },
      },
      {
        header: "User ID",
        accessorKey: "_id",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <Link
            to="#!"
            className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600 user-id"
          >
            {cell.getValue()}
          </Link>
        ),
      },
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-10 font-medium rounded-full shrink-0 bg-slate-200 text-slate-800 dark:text-zink-50 dark:bg-zink-600">
              {cell.row.original.img ? (
                <img
                  src={cell.row.original.img}
                  alt=""
                  className="h-10 rounded-full"
                />
              ) : (
                cell
                  .getValue()
                  .split(" ")
                  .map((word: any) => word.charAt(0))
                  .join("")
              )}
            </div>
            <div className="grow">
              <h6 className="mb-1">
                <Link to="#!" className="name">
                  {cell.getValue()}
                </Link>
              </h6>
              <p className="text-slate-500 dark:text-zink-200">
                {cell.row.original.designation}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Is Vendor",
        accessorKey: "isVendor",
        enableColumnFilter: false,
      },
      {
        header: "Is Admin",
        accessorKey: "isAdmin",
        enableColumnFilter: false,
      },
      {
        header: "Shop ID",
        accessorKey: "shopId",
        enableColumnFilter: false,
      },
     

      {
        header: "Joining Date",
        accessorKey: "createdAt",
        enableColumnFilter: false,
      },
    ],
    []
  );

  const downloadUsersDataInExcel = () => {
    const data = user;
    const fileName = "Users";
    const exportType = "xls";
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.${exportType}`);
  };

  return (
    <React.Fragment>
      <BreadCrumb title="Users" pageTitle="Users" />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
        <div className="xl:col-span-12">
          <div className="card" id="usersTable">
            <div className="card-body">
              <div className="flex items-center">
                <h6 className="text-15 grow">Users List</h6>
              </div>
            </div>
            <div className="!py-3.5 card-body border-y border-dashed border-slate-200 dark:border-zink-500">
              <form action="#!">
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                  <div className="relative xl:col-span-2">
                    <input
                      type="text"
                      className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                      placeholder="Search for name, email, phone number etc..."
                      autoComplete="off"
                      onChange={(e) => filterSearchData(e)}
                    />
                    <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
                  </div>

                  <div className="xl:col-span-3 xl:col-start-10">
                    <div className="flex gap-2 xl:justify-end">
                      <div>
                        <button
                          onClick={toggle}
                          type="button"
                          className="bg-white mr-3 text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
                        >
                          <Download className="inline-block size-4" />{" "}
                          <span className="align-middle">Add User</span>
                        </button>
                        <button
                          onClick={downloadUsersDataInExcel}
                          type="button"
                          className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
                        >
                          <span className="align-middle">Export</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-body">
              {user && user.length > 0 ? (
                <TableContainer
                  isPagination={true}
                  columns={columns || []}
                  data={user || []}
                  customPageSize={10}
                  divclassName="-mx-5 -mb-5 overflow-x-auto"
                  tableclassName="w-full border-separate table-custom border-spacing-y-1 whitespace-nowrap"
                  theadclassName="text-left relative rounded-md bg-slate-100 dark:bg-zink-600 after:absolute ltr:after:border-l-2 rtl:after:border-r-2 ltr:after:left-0 rtl:after:right-0 after:top-0 after:bottom-0 after:border-transparent [&.active]:after:border-custom-500 [&.active]:bg-slate-100 dark:[&.active]:bg-zink-600"
                  thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold"
                  tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5"
                  PaginationClassName="flex flex-col items-center mt-8 md:flex-row"
                />
              ) : (
                <div className="noresult">
                  <div className="py-6 text-center">
                    <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                    <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">
                      We've searched more than 199+ users We did not find any
                      users for you search.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Modal  */}
      <Modal
        show={show}
        onHide={toggle}
        id="defaultModal"
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
      >
        <Modal.Header
          className="flex items-center justify-between p-4 border-b dark:border-zink-300/20"
          closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
        >
          <Modal.Title className="text-16">{"Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <form
            action="#!"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <div className="mb-3">
              <label
                htmlFor="userNameInput"
                className="inline-block mb-2 text-base font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="userNameInput"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder="Enter name"
                name="name"
                onChange={validation.handleChange}
                value={validation.values.name || ""}
              />
              {validation.touched.name && validation.errors.name ? (
                <p className="text-red-400">{validation.errors.name}</p>
              ) : null}
            </div>

            <div className="mb-3">
              <label
                htmlFor="emailInput"
                className="inline-block mb-2 text-base font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="emailInput"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder="Enter email"
                name="email"
                onChange={validation.handleChange}
                value={validation.values.email || ""}
              />
              {validation.touched.email && validation.errors.email ? (
                <p className="text-red-400">{validation.errors.email}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label
                htmlFor="passwordInput"
                className="inline-block mb-2 text-base font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="passwordInput"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder="Enter password"
                name="password"
                onChange={validation.handleChange}
                value={validation.values.password || ""}
              />
              {validation.touched.password && validation.errors.password ? (
                <p className="text-red-400">{validation.errors.password}</p>
              ) : null}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="reset"
                data-modal-close="addDocuments"
                className="text-red-500 transition-all duration-200 ease-linear bg-white border-white btn hover:text-red-600 focus:text-red-600 active:text-red-600 dark:bg-zink-500 dark:border-zink-500"
                onClick={toggle}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
              >
                {"Add User"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default UsersTable;
