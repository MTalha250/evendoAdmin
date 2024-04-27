import React from "react";
import { ArrowDown, ArrowUp, Kanban, Users } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import toast from "react-hot-toast";

const Widgets = () => {
  const [data, setData] = useState({
    userCount: 0,
    orderCount: 0,
    cartCount: 0,
    contactCount: 0,
    itemCount: 0,
    shopCount: 0,
  });

  useEffect(() => {
    handleGetStats();
  }, []);

  const handleGetStats = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { userCount, orderCount, shopCount, cartCount, contactCount, itemCount } =
        res.data;
      setData({
        userCount,
        orderCount,
        cartCount,
        contactCount,
        itemCount,
        shopCount,
      });
    } catch (error: any) {
      if (!error.response) {
        return toast.error("Network error. Please try again.");
      }
      if (typeof error.response.data === "string") {
        return toast.error(error.response.data);
      }
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <div className="order-1 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-purple-100 dark:bg-purple-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-purple-200/50 dark:text-purple-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-purple-500 rounded-md text-15 text-purple-50">
            <Users />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.userCount} className="counter-value" />
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Total Users</p>
        </div>
      </div>
      <div className="order-2 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-green-100 dark:bg-green-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-green-200/50 dark:text-green-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-green-500 rounded-md text-15 text-green-50">
            <Users />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.orderCount} className="counter-value" />
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Total Orders</p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-purple-100 dark:bg-purple-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-purple-200/50 dark:text-purple-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-purple-500 rounded-md text-15 text-purple-50">
            <ArrowDown />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.shopCount} className="counter-value" />
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Total Shops</p>
        </div>
      </div>
      <div className="order-2 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-orange-100 dark:bg-orange-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-orange-200/50 dark:text-orange-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-orange-500 rounded-md text-15 text-orange-50">
            <Users />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.itemCount} className="counter-value" />
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Total Items</p>
        </div>
      </div>
      <div className="order-2 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-orange-100 dark:bg-orange-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-orange-200/50 dark:text-orange-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-orange-500 rounded-md text-15 text-orange-50">
            <Users />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.contactCount} className="counter-value" />
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Total Contacts</p>
        </div>
      </div>

      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-purple-100 dark:bg-purple-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-purple-200/50 dark:text-purple-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-purple-500 rounded-md text-15 text-purple-50">
            <ArrowDown />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.cartCount} className="counter-value" />
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Total Carts</p>
        </div>
      </div>
      {/* <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-orange-100 dark:bg-orange-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-orange-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-orange-200/50 dark:text-orange-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-orange-500 rounded-md text-15 text-orange-50">
            <ArrowDown />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.totalUsers} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Pending Deposit</p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-red-100 dark:bg-red-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-red-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-red-200/50 dark:text-red-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-red-500 rounded-md text-15 text-red-50">
            <ArrowDown />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.totalDrivers} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Rejected Deposit</p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-neutral-100 dark:bg-neutral-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-neutral-200/50 dark:text-neutral-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-neutral-500 rounded-md text-15 text-neutral-50">
            <ArrowDown />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.totalDrivers} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Deposited Charge</p>
        </div>
      </div>

      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-purple-100 dark:bg-purple-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-purple-200/50 dark:text-purple-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-purple-500 rounded-md text-15 text-purple-50">
            <ArrowUp />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.totalDrivers} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">Total Withdrawal</p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-orange-100 dark:bg-orange-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-orange-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-orange-200/50 dark:text-orange-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-orange-500 rounded-md text-15 text-orange-50">
            <ArrowUp />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.totalDrivers} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">
            Pending Withdrawal
          </p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-red-100 dark:bg-red-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-red-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-red-200/50 dark:text-red-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-red-500 rounded-md text-15 text-red-50">
            <ArrowUp />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.totalDrivers} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">
            Rejected Withdrawal
          </p>
        </div>
      </div>
      <div className="order-3 md:col-span-6 lg:col-span-3 col-span-12 2xl:order-1 bg-neutral-100 dark:bg-neutral-500/20 card 2xl:col-span-2 group-data-[skin=bordered]:border-purple-500/20 relative overflow-hidden">
        <div className="card-body">
          <Kanban className="absolute top-0 size-32 stroke-1 text-neutral-200/50 dark:text-neutral-500/20 ltr:-right-10 rtl:-left-10"></Kanban>
          <div className="flex items-center justify-center size-12 bg-neutral-500 rounded-md text-15 text-neutral-50">
            <ArrowUp />
          </div>
          <h5 className="mt-5 mb-2">
            <CountUp end={data.totalDrivers} className="counter-value" />$
          </h5>
          <p className="text-slate-500 dark:text-slate-200">
            Withdrawal Charge
          </p>
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default Widgets;
