import React, { useCallback, useEffect, useMemo, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import moment from "moment";
import * as XLSX from "xlsx";
import * as Yup from "yup";

// Icons
import { Download, MoreHorizontal, Search, Trash } from "lucide-react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Dropdown } from "Common/Components/Dropdown";
import toast from "react-hot-toast";
import { useFormik } from "formik";

const Items = () => {
  const [ItemList, setItemList] = useState([]);
  const [creatingItem, setCreatingItem] = useState<boolean>(false);
  const [Items, setItems] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    handleFetchItems();
  }, []);

  useEffect(() => {
    setItems(ItemList);
  }, [ItemList]);

  // fetch data
  const handleFetchItems = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/item`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setItemList(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URI}/item/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Item deleted successfully!");
        handleFetchItems();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Item!");
      console.log(error);
    }
  };

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      phone: "",
      licenseNumber: "",
      licenseExpiry: "",
      user: "",
      licenseImage: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Please Enter Phone Number"),
      licenseNumber: Yup.string().required("Please Enter License Number"),
      licenseExpiry: Yup.string().required("Please Enter License Expiry Date"),
      user: Yup.string().required("Please Enter User"),
      licenseImage: Yup.string().required("Please upload Item's license"),
    }),

    onSubmit: async (values) => {
      const newData = {
        ...values,
      };
      console.log(newData);
      setCreatingItem(true);
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URI}/crm/Item`,
          {
            ...newData,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        handleFetchItems();
        toast.success("Item made successfully!");
        toggle();
        validation.resetForm();
      } catch (error: any) {
        if (!error.response) {
          return toast.error("Network error. Please try again.");
        }
        if (typeof error.response.data === "string") {
          return toast.error(error.response.data);
        }
      } finally {
        setCreatingItem(false);
      }
    },
  });

  const toggle = useCallback(() => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      validation.resetForm();
    }
  }, [show, validation]);

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
        header: "Image",
        accessorKey: "images",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <img
            src={cell.row.original?.images[0]}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
        ),
      },
      {
        header: "Item ID",
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
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "Category",
        accessorKey: "category",
        enableColumnFilter: false,
      },
      {
        header: "Sub Category",
        accessorKey: "subcategory",
        enableColumnFilter: false,
      },
      {
        header: "City",
        accessorKey: "city",
        enableColumnFilter: false,
      },

      {
        header: "Price",
        accessorKey: "price",
        enableColumnFilter: false,
      },
      {
        header: "Date and Time",
        accessorKey: "createdAt",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <span className="text-slate-500 dark:text-zink-200">
            {moment(cell.getValue()).format("DD/MM/YYYY hh:mm A")}
          </span>
        ),
      },
      {
        header: "Action",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <Dropdown className="relative">
            <Dropdown.Trigger
              id="orderAction1"
              data-bs-toggle="dropdown"
              className="flex items-center justify-center size-[30px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"
            >
              <MoreHorizontal className="size-3" />
            </Dropdown.Trigger>
            <Dropdown.Content
              placement={cell.row.index ? "top-end" : "right-end"}
              className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md min-w-[10rem] dark:bg-zink-600"
              aria-labelledby="orderAction1"
            >
              <li onClick={() => deleteItem(cell.row.original._id)}>
                x
                <p className="block cursor-pointer px-4 py-1.5 text-base transition-all duration-200 ease-linear text-red-500 hover:bg-red-100 hover:text-red-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200">
                  <Trash className="inline-block size-3 ltr:mr-1 rtl:ml-1" />{" "}
                  <span className="align-middle">Delete</span>
                </p>
              </li>
            </Dropdown.Content>
          </Dropdown>
        ),
      },
    ],
    []
  );

  const dowloadItemsInExcel = async () => {
    const data = Items.map((item: any) => {
      return {
        "Item ID": item._id,
        Title: item.title,
        Category: item.category,
        SubCategory: item.subcategory,
        City: item.city,
        Price: item.price,
        "Date and Time": moment(item.createdAt).format("DD/MM/YYYY hh:mm A"),
      };
    });

    const fileName = "Items";
    const exportType = "xls";
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.${exportType}`);
  };

  const filterSearchData = (e: any) => {
    const search = e.target.value;
    const keysToSearch = ["_id", "name", "address", "website"];
    const searchResult = ItemList.filter((item: any) => {
      return keysToSearch.some((key) => {
        return (
          item[key] &&
          item[key].toString().toLowerCase().includes(search.toLowerCase())
        );
      });
    });
    setItemList(searchResult);
  };

  return (
    <React.Fragment>
      <BreadCrumb title="Items" pageTitle="Items" />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
        <div className="xl:col-span-12">
          <div className="card" id="Items">
            <div className="card-body">
              <div className="flex gap-2">
                <div className="ml-auto">
                  <button
                    onClick={dowloadItemsInExcel}
                    type="button"
                    className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
                  >
                    <Download className="inline-block size-4" />{" "}
                    <span className="align-middle">Export</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <h6 className="text-15 grow">Items List</h6>
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
                    {/* <div className="xl:col-span-3 xl:col-start-10">
                      <div className="flex gap-2 xl:justify-end">
                        <div>
                          <button
                            type="button"
                            className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
                            onClick={toggle}
                          >
                            <span className="align-middle">Add Item</span>
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
            <div className="card-body">
              {Items && Items.length > 0 ? (
                <TableContainer
                  isPagination={true}
                  columns={columns || []}
                  data={Items || []}
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
      {/* <Modal
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
          <Modal.Title className="text-16">{"Create Item"}</Modal.Title>
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
                htmlFor="user"
                className="inline-block mb-2 text-base font-medium"
              >
                User
              </label>
              <select
                className="form-input border-slate-300 focus:outline-none focus:border-custom-500"
                id="user"
                name="user"
                onChange={validation.handleChange}
                value={validation.values.user || ""}
              >
                <option value={""} disabled selected>
                  Select a Item
                </option>
                {userList?.map((item: any) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="licenseNumber"
                className="inline-block mb-2 text-base font-medium"
              >
                Driving License Number
              </label>
              <input
                type="text"
                id="licenseNumber"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder=""
                name="licenseNumber"
                onChange={validation.handleChange}
                value={validation.values.licenseNumber || ""}
              />
              {validation.touched.licenseNumber &&
              validation.errors.licenseNumber ? (
                <p className="text-red-400">
                  {validation.errors.licenseNumber}
                </p>
              ) : null}
            </div>
            <div className="mb-3">
              <label
                htmlFor="expenseDate"
                className="inline-block mb-2 text-base font-medium"
              >
                License Expiry Date
              </label>
              <input
                type="date"
                id="licenseExpiry"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder=""
                name="licenseExpiry"
                onChange={validation.handleChange}
                value={validation.values.licenseExpiry || ""}
              />
              {validation.touched.licenseExpiry &&
              validation.errors.licenseExpiry ? (
                <p className="text-red-400">
                  {validation.errors.licenseExpiry}
                </p>
              ) : null}
            </div>
            <div className="mb-3">
              <label
                htmlFor="phone"
                className="inline-block mb-2 text-base font-medium"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder="+1 234 12344323"
                name="phone"
                onChange={validation.handleChange}
                value={validation.values.phone || ""}
              />
              {validation.touched.phone && validation.errors.phone ? (
                <p className="text-red-400">{validation.errors.phone}</p>
              ) : null}
            </div>
            <div className="xl:col-span-12">
              <label
                htmlFor="fileUpload"
                className="inline-block mb-2 text-base font-medium"
              >
                Upload Items License
              </label>
              <PhotosUploader
                maxPhotos={1}
                addedPhotos={images}
                onChange={(photos: any) => {
                  setImages(photos);
                }}
              />
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
                {"Add Item"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal> */}
    </React.Fragment>
  );
};

export default Items;
