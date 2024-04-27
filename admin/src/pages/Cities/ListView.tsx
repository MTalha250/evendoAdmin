import React, { useCallback, useEffect, useMemo, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import moment from "moment";
import * as XLSX from "xlsx";
import * as Yup from "yup";
import PhotosUploader from "components/Forms/ImageUploader";
import Modal from "Common/Components/Modal";

// Icons
import { Download, MoreHorizontal, Search, Trash } from "lucide-react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Dropdown } from "Common/Components/Dropdown";
import toast from "react-hot-toast";
import { useFormik } from "formik";

const Cities = () => {
  const [cityList, setCityList] = useState([]);
  const [creatingCity, setCreatingCity] = useState<boolean>(false);
  const [Cities, setCities] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    handleFetchCities();
  }, []);

  useEffect(() => {
    setCities(cityList);
  }, [cityList]);

  // fetch data
  const handleFetchCities = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/city`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCityList(res.data.cities);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCity = async (id: string) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URI}/city/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("City deleted successfully!");
        handleFetchCities();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete City!");
      console.log(error);
    }
  };

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("City Name is required"),
    }),

    onSubmit: async (values) => {
      if (images.length === 0) return toast.error("Please upload an image");
      const newData = {
        ...values,
      };
      setCreatingCity(true);
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URI}/city`,
          {
            name: newData.name,
            image: images[0],
            link: `/city/${newData.name.toLowerCase()}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        handleFetchCities();
        toast.success("City added successfully!");
        toggle();
        validation.resetForm();
        setImages([]);
      } catch (error: any) {
        console.log(error);
        if (!error.response) {
          return toast.error("Network error. Please try again.");
        }
        if (typeof error.response.data === "string") {
          return toast.error(error.response.data);
        }
      } finally {
        setCreatingCity(false);
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
          <div className="flex Orders-center h-full">
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
            <div className="flex Orders-center h-full">
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
        accessorKey: "image",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <img
            src={cell.getValue()}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
        ),
      },
      {
        header: "City ID",
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
        header: "City Name",
        accessorKey: "name",
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
              className="flex Orders-center justify-center size-[30px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"
            >
              <MoreHorizontal className="size-3" />
            </Dropdown.Trigger>
            <Dropdown.Content
              placement={cell.row.index ? "top-end" : "right-end"}
              className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md min-w-[10rem] dark:bg-zink-600"
              aria-labelledby="orderAction1"
            >
              <li onClick={() => deleteCity(cell.row.original._id)}>
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

  const dowloadCitiesInExcel = async () => {
    const data = Cities.map((City: any) => {
      return {
        "City ID": City._id,
        Name: City.name,
        Image: City.image,
        Link: City.link,
        "Date and Time": moment(City.createdAt).format("DD/MM/YYYY hh:mm A"),
      };
    });

    const fileName = "Cities";
    const exportType = "xls";
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.${exportType}`);
  };

  const filterSearchData = (e: any) => {
    const search = e.target.value;
    const keysToSearch = ["_id", "image", "name"];
    const searchResult = cityList.filter((City: any) => {
      return keysToSearch.some((key) => {
        return (
          City[key] &&
          City[key].toString().toLowerCase().includes(search.toLowerCase())
        );
      });
    });
    setCityList(searchResult);
  };

  return (
    <React.Fragment>
      <BreadCrumb title="Cities" pageTitle="Cities" />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
        <div className="xl:col-span-12">
          <div className="card" id="Orders">
            <div className="card-body">
              <div className="flex Orders-center">
                <h6 className="text-15 grow">Cities List</h6>
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
                            <span className="align-middle">Add City</span>
                          </button>
                          <button
                            onClick={dowloadCitiesInExcel}
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
            </div>
            <div className="card-body">
              {Cities && Cities.length > 0 ? (
                <TableContainer
                  isPagination={true}
                  columns={columns || []}
                  data={Cities || []}
                  customPageSize={10}
                  divclassName="-mx-5 -mb-5 overflow-x-auto"
                  tableclassName="w-full border-separate table-custom border-spacing-y-1 whitespace-nowrap"
                  theadclassName="text-left relative rounded-md bg-slate-100 dark:bg-zink-600 after:absolute ltr:after:border-l-2 rtl:after:border-r-2 ltr:after:left-0 rtl:after:right-0 after:top-0 after:bottom-0 after:border-transparent [&.active]:after:border-custom-500 [&.active]:bg-slate-100 dark:[&.active]:bg-zink-600"
                  thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold"
                  tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5"
                  PaginationClassName="flex flex-col Orders-center mt-8 md:flex-row"
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
      <Modal
        show={show}
        onHide={toggle}
        id="defaultModal"
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
      >
        <Modal.Header
          className="flex Orders-center justify-between p-4 border-b dark:border-zink-300/20"
          closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
        >
          <Modal.Title className="text-16">{"Add City"}</Modal.Title>
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
            <div className="xl:col-span-12">
              <label
                htmlFor="fileUpload"
                className="inline-block mb-2 text-base font-medium"
              >
                Upload City Image
              </label>
              <PhotosUploader
                maxPhotos={1}
                addedPhotos={images}
                onChange={(photos: any) => {
                  setImages(photos);
                }}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="inline-block mb-2 text-base font-medium"
              >
                City Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder=""
                name="name"
                onChange={validation.handleChange}
                value={validation.values.name || ""}
              />
              {validation.touched.name && validation.errors.name ? (
                <p className="text-red-400">{validation.errors.name}</p>
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
                {"Add City"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Cities;
