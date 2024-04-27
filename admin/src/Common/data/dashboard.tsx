import { Goal, MousePointerClick, MousePointerSquare, Rocket } from 'lucide-react';
import { ReactElement } from 'react';

// Images
import avatar1 from "assets/images/users/avatar-1.png";
import avatar2 from "assets/images/users/avatar-2.png";
import avatar3 from "assets/images/users/avatar-3.png";
import avatar4 from "assets/images/users/avatar-4.png";
import avatar5 from "assets/images/users/avatar-5.png";
import avatar6 from "assets/images/users/avatar-6.png";
import avatar7 from "assets/images/users/avatar-7.png";
import avatar8 from "assets/images/users/avatar-8.png";
import avatar9 from "assets/images/users/avatar-9.png";
import avatar10 from "assets/images/users/avatar-10.png";

import User1 from "assets/images/users/user-1.jpg";
import User2 from "assets/images/users/user-2.jpg";
import User3 from "assets/images/users/user-3.jpg";

import appStore from "assets/images/brand/app-store.png";
import telegram from "assets/images/brand/telegram.png";
import android from "assets/images/brand/android.png";
import slack from "assets/images/brand/slack.png";


const AccountsStatsData = [
    {
        accountId: "786914",
        mainPassword: "Mo5B@1aRWBC",
        investorPassword: "Mo5B@1aRWBC",
        type: "Real",
        server: "EZICapitalManagement-Server",
        balance: 1,
        equity: 1,
        liveStatus: "Disabled"
    },
    {
        accountId: "789123",
        mainPassword: "Px9C#2oRGDM",
        investorPassword: "Px9C#2oRGDM",
        type: "Demo",
        server: "DemoServer1",
        balance: 10000,
        equity: 10000,
        liveStatus: "Active"
    },
    {
        accountId: "792345",
        mainPassword: "Ft3D$5pYUHN",
        investorPassword: "Ft3D$5pYUHN",
        type: "Real",
        server: "FXTradingPlatform-Server",
        balance: 500,
        equity: 500,
        liveStatus: "Active"
    },
    {
        accountId: "795678",
        mainPassword: "Lw8E!9mQASZ",
        investorPassword: "Lw8E!9mQASZ",
        type: "Real",
        server: "GlobalForexExchange-Server",
        balance: 1000,
        equity: 1000,
        liveStatus: "Disabled"
    },
    {
        accountId: "798901",
        mainPassword: "Rj1K@4sPLXC",
        investorPassword: "Rj1K@4sPLXC",
        type: "Demo",
        server: "DemoServer2",
        balance: 50000,
        equity: 50000,
        liveStatus: "Active"
    },
    {
        accountId: "802234",
        mainPassword: "Bp7V#3qAZSX",
        investorPassword: "Bp7V#3qAZSX",
        type: "Real",
        server: "InvestmentBankingPlatform-Server",
        balance: 2000,
        equity: 2000,
        liveStatus: "Active"
    },
    {
        accountId: "805567",
        mainPassword: "Yz6U!2wELNU",
        investorPassword: "Yz6U!2wELNU",
        type: "Real",
        server: "CryptoTradingPlatform-Server",
        balance: 3000,
        equity: 3000,
        liveStatus: "Active"
    },
    {
        accountId: "808890",
        mainPassword: "Hx4M$8nJKIV",
        investorPassword: "Hx4M$8nJKIV",
        type: "Demo",
        server: "DemoServer3",
        balance: 100000,
        equity: 100000,
        liveStatus: "Disabled"
    },
    {
        accountId: "812123",
        mainPassword: "Qr9S#6fVGHB",
        investorPassword: "Qr9S#6fVGHB",
        type: "Real",
        server: "StockTradingPlatform-Server",
        balance: 5000,
        equity: 5000,
        liveStatus: "Disabled"
    },
    {
        accountId: "815456",
        mainPassword: "Xc2B!5gZQWE",
        investorPassword: "Xc2B!5gZQWE",
        type: "Real",
        server: "CommodityTradingPlatform-Server",
        balance: 8000,
        equity: 8000,
        liveStatus: "Active"
    },
    {
        accountId: "818789",
        mainPassword: "Op3A$7rTYUI",
        investorPassword: "Op3A$7rTYUI",
        type: "Demo",
        server: "DemoServer4",
        balance: 200000,
        equity: 200000,
        liveStatus: "Active"
    },
    {
        accountId: "822012",
        mainPassword: "Nm6X#9hLWCD",
        investorPassword: "Nm6X#9hLWCD",
        type: "Real",
        server: "ForexTradingPlatform-Server",
        balance: 10000,
        equity: 10000,
        liveStatus: "Active"
    },
    {
        accountId: "825345",
        mainPassword: "Zb1Y@4pCKML",
        investorPassword: "Zb1Y@4pCKML",
        type: "Real",
        server: "BinaryOptionsPlatform-Server",
        balance: 20000,
        equity: 20000,
        liveStatus: "Active"
    }
];


const ProductOrdersData = [
    {
        id: "01",
        orderId: "#TWT5015100365",
        customerName: "Marie Prohaska",
        location: "Germany",
        orderDate: "08 Jun, 2023",
        payments: "Credit Card",
        quantity: "05",
        price: "$146.99",
        totalAmount: "$749.95",
        status: "Delivered"
    },
    {
        id: "02",
        orderId: "#TWT5015100366",
        customerName: "Jaqueline Hammes",
        location: "France",
        orderDate: "11 July, 2023",
        payments: "Paypal",
        quantity: "02",
        price: "$450.00",
        totalAmount: "$900.00",
        status: "Shipping"
    },
    {
        id: "03",
        orderId: "#TWT5015100367",
        customerName: "Marlene Hirthe",
        location: "Argentina",
        orderDate: "21 Aug, 2023",
        payments: "Visa Card",
        quantity: "03",
        price: "$147.23",
        totalAmount: "$294.46",
        status: "New"
    },
    {
        id: "04",
        orderId: "#TWT5015100368",
        customerName: "Reagan Larson",
        location: "Belgium",
        orderDate: "28 Nov, 2023",
        payments: "American Express",
        quantity: "01",
        price: "$579.12",
        totalAmount: "$579.12",
        status: "Delivered"
    },
    {
        id: "05",
        orderId: "#TWT5015100369",
        customerName: "Glennie Langosh",
        location: "Australia",
        orderDate: "11 Oct, 2023",
        payments: "American Express",
        quantity: "01",
        price: "$349.00",
        totalAmount: "$349.00",
        status: "Pending"
    },
    {
        id: "06",
        orderId: "#TWT5015100370",
        customerName: "Rickie Cremin",
        location: "United States",
        orderDate: "16 Feb, 2023",
        payments: "COD",
        quantity: "03",
        price: "$89.49",
        totalAmount: "$268.47",
        status: "Delivered"
    },
    {
        id: "07",
        orderId: "#TWT5015100371",
        customerName: "Domenic Tromp",
        location: "Afghanistan",
        orderDate: "21 Jan, 2024",
        payments: "PayPal",
        quantity: "02",
        price: "$739.79",
        totalAmount: "$1,479.58",
        status: "New"
    },

];

type WidgetData = {
    id: number;
    icon: ReactElement;
    price: number;
    name: string;
    description: string;
    chartId: string;
    chartColor: string; // Assuming that 'chartColor' is a string representing a CSS class
    decimals: number;
    suffix: string;
    series: {
        name: string;
        data: number[];
    }[];
};

//Dashboard Email
const widgetsData: WidgetData[] = [
    {
        id: 1,
        icon: <Rocket className="inline-block size-4 ltr:mr-1 rtl:ml-1" />,
        price: 1452,
        name: "SENT",
        description: "238 Emails",
        chartId: "sentEmail",
        chartColor: '["bg-custom-500"]',
        decimals: 0,
        suffix: '',
        series: [{
            name: 'Sent',
            data: [
                14, 20, 10, 5, 11, 30, 24, 26, 33, 38, 34, 27, 22
            ]
        }],
    },
    {
        id: 2,
        icon: <MousePointerClick className="inline-block size-4 ltr:mr-1 rtl:ml-1" />,
        price: 92.74,
        name: "Open Rate",
        description: "60 Opened",
        chartId: "openRate",
        chartColor: '["bg-green-500"]',
        decimals: 2,
        suffix: '%',
        series: [{
            name: 'Open Rate',
            data: [
                38, 34, 27, 22, 14, 20, 10, 5, 11, 30, 24, 26, 33
            ]
        }],
    },
    {
        id: 3,
        icon: <MousePointerSquare className="inline-block size-4 ltr:mr-1 rtl:ml-1" />,
        price: 3.79,
        name: "CLICKS RATE",
        description: "29 Clicks",
        chartId: "clickRate",
        chartColor: '["bg-red-500"]',
        decimals: 2,
        suffix: '%',
        series: [{
            name: 'Click Rate',
            data: [
                30, 24, 14, 20, 10, 5, 11, 26, 33, 38, 34, 27, 22
            ]
        }],
    },
    {
        id: 4,
        icon: <Goal className="inline-block size-4 ltr:mr-1 rtl:ml-1" />,
        price: 4.06,
        name: "Click Through",
        description: "29 Click Through",
        decimals: 2,
        suffix: '%',
        chartId: "clickThrough",
        chartColor: '["bg-sky-500"]',
        series: [{
            name: 'Click Through',
            data: [
                11, 30, 24, 26, 33, 38, 14, 20, 10, 5, 34, 27, 22
            ]
        }],
    },
];

const widgetsData2 = [
    {
        id: 1,
        title: "Delivered Rate",
        percentage: 100,
        chartId: "deliveredRate",
        dataChartColor: '["bg-sky-500"]',
        series: [{
            name: 'Delivered Rate',
            data: [
                11, 30, 24, 26, 33, 38, 14, 20, 10, 9, 34, 27, 22
            ]
        }],
    },
    {
        id: 2,
        title: "Hard Bounce Rate",
        percentage: 89,
        chartId: "hardBounceRate",
        dataChartColor: '["bg-green-500"]',
        series: [{
            name: 'Hard Bounce Rate',
            data: [
                14, 20, 10, 5, 11, 30, 24, 26, 33, 38, 34, 27, 22
            ]
        }],
    },
    {
        id: 3,
        title: "Unsubscribed Rate",
        percentage: 33,
        chartId: "unsubscribedRate",
        dataChartColor: '["bg-yellow-500"]',
        series: [{
            name: 'Unsubscribed Rate',
            data: [
                38, 34, 27, 22, 14, 20, 10, 5, 11, 30, 24, 26, 33
            ]
        }],
    },
    {
        id: 4,
        title: "Spam Report Rate",
        percentage: 11.8,
        decimals: 2,
        chartId: "spanReportRate",
        dataChartColor: '["bg-purple-500"]',
        series: [{
            name: 'Spam Report Rate',
            data: [
                30, 24, 14, 20, 10, 13, 11, 26, 33, 38, 34, 27, 22
            ]
        }],
    },
];

// Dashboard HR
const EmployeePerformanceData = [
    {
        id: 1,
        employeeId: "TW-1001",
        img: avatar10,
        checkboxId: "productsCheck1",
        name: "Kristen Redden",
        email: "kredden@tailwick.com",
        designation: "Designer",
        performance: "Good",
        isActive: true
    },
    {
        id: 2,
        employeeId: "TW-1002",
        img: avatar2,
        checkboxId: "productsCheck2",
        name: "Howard George",
        email: "george@tailwick.com",
        designation: "ASP.Net Developer",
        performance: "Low",
        isActive: true
    },
    {
        id: 3,
        employeeId: "TW-1003",
        img: avatar3,
        checkboxId: "productsCheck3",
        name: "Laura Carlson",
        email: "carlson15@tailwick.com",
        designation: "React Developer",
        performance: "Good",
        isActive: true
    },
    {
        id: 4,
        employeeId: "TW-1004",
        img: avatar4,
        checkboxId: "productsCheck4",
        name: "Joseph Hawkins",
        email: "joseph@tailwick.com",
        designation: "Angular Developer",
        performance: "Good",
        isActive: false
    },
    {
        id: 5,
        employeeId: "TW-1005",
        img: avatar5,
        checkboxId: "productsCheck5",
        name: "Jeremy Clifford",
        email: "joseph@tailwick.com",
        designation: "UI / UX Designer",
        performance: "Low",
        isActive: false
    }
];

const RecentPayrollData = [
    {
        id: 1,
        icon: "move-up-right",
        name: "Christopher Horn",
        amount: "$145.32",
        status: "Paid"
    },
    {
        id: 2,
        icon: "move-down-left",
        name: "Richard Peters",
        amount: "$4512.99",
        status: "Pending"
    },
    {
        id: 3,
        icon: "move-down-left",
        name: "James Perez",
        amount: "$879.99",
        status: "Paid"
    },
    {
        id: 4,
        icon: "move-up-right",
        name: "Myrtle Velez",
        amount: "$978.14",
        status: "Cancelled"
    },
    {
        id: 5,
        icon: "move-down-left",
        name: "Brad Castillo",
        amount: "$412.59",
        status: "Pending"
    },
    {
        id: 6,
        icon: "move-down-left",
        name: "Robert Jump",
        amount: "$666.99",
        status: "Paid"
    },
    {
        id: 7,
        icon: "move-up-right",
        name: "Myrtle Velez",
        amount: "$978.14",
        status: "Cancelled"
    },
    {
        id: 8,
        icon: "move-up-right",
        name: "Christopher Horn",
        amount: "$145.32",
        status: "Paid"
    },
    {
        id: 9,
        icon: "move-down-left",
        name: "Richard Peters",
        amount: "$4512.99",
        status: "Pending"
    },
    {
        id: 10,
        icon: "move-down-left",
        name: "James Perez",
        amount: "$879.99",
        status: "Paid"
    }
];

const UpcomingInterviewData = [
    {
        id: 1,
        name: "James Krogman",
        email: "james@tailwick.com",
        image: User1,
        date: "25 Nov",
        time: "02:41 PM",
        status: "Confirm"
    },
    {
        id: 2,
        name: "Michael Scott",
        email: "michaelScott@tailwick.com",
        image: User2,
        date: "05 Dec",
        time: "01:23 PM",
        status: "Re-scheduled"
    },
    {
        id: 3,
        name: "Denise Ledford",
        email: "ledford@tailwick.com",
        image: User3,
        date: "27 Nov",
        time: "11:59 PM",
        status: "Scheduled"
    },
    {
        id: 4,
        name: "Gladys Smith",
        email: "gap-4@tailwick.com",
        image: avatar5,
        date: "07 Dec",
        time: "05:19 PM",
        status: "Cancelled"
    }
];

const UpcomingScheduledData = [
    {
        id: 1,
        date: "28",
        month: "July",
        title: "Meeting with Designer",
        time: "09:57 AM",
        createdBy: "Admin"
    },
    {
        id: 2,
        date: "08",
        month: "June",
        title: "Developing Line Managers Conference",
        time: "10:54 AM",
        createdBy: "HR"
    },
    {
        id: 3,
        date: "17",
        month: "July",
        title: "Airplane in Las Vegas",
        time: "12:00 PM",
        createdBy: "HR"
    },
    {
        id: 4,
        date: "11",
        month: "Nov",
        title: "Hospitality Project Discuses",
        createdBy: "Admin"
    },
    {
        id: 5,
        date: "20",
        month: "Nov",
        title: "Gartner Digital Workplace",
        time: "03:49 PM",
        createdBy: "HR"
    },
    {
        id: 6,
        date: "04",
        month: "Dec",
        title: "Nordic People Analytics",
        time: "11:00 AM",
        createdBy: "Admin"
    },
    {
        id: 7,
        date: "17",
        month: "Jan",
        title: "CIPD Festival of Work",
        time: "01:29 PM",
        createdBy: "HR"
    }
];

// Dashborad Social Media
const activeFriendsData = [avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar10, avatar9, avatar4, avatar5, avatar1];

const storyData = [
    { id: 1, image: avatar1, username: "Your story", bgColor: "bg-pink-100 dark:bg-pink-500/20", isActive: true },
    { id: 2, image: avatar2, username: "@zaria_muller", bgColor: "bg-sky-100 dark:bg-sky-500/20", isActive: true },
    { id: 3, image: avatar3, username: "@christina", bgColor: "bg-slate-100 dark:bg-zink-600", isActive: true },
    { id: 4, image: avatar4, username: "@blaze_herzog", bgColor: "bg-yellow-100 dark:bg-yellow-500/20", isActive: true },
    { id: 5, image: avatar5, username: "@keon_rippin", bgColor: "bg-emerald-100 dark:bg-emerald-500/20", isActive: true },
    { id: 6, image: avatar6, username: "@niko_watsica", bgColor: "bg-purple-100 dark:bg-purple-500/20", isActive: true },
    { id: 7, image: avatar7, username: "@genesis", bgColor: "bg-custom-100 dark:bg-custom-500/20", isActive: false },
    { id: 8, image: avatar8, username: "@brayan_herman", bgColor: "bg-green-100 dark:bg-green-500/20", isActive: false },
    { id: 9, image: avatar9, username: "@logan", bgColor: "bg-purple-100 dark:bg-purple-500/20", isActive: false },
    { id: 10, image: avatar10, username: "@gerhold", bgColor: "bg-cyan-100 dark:bg-cyan-500/20", isActive: false },
    { id: 11, image: avatar2, username: "@fletcher", bgColor: "bg-sky-100 dark:bg-sky-500/20", isActive: false },
    { id: 12, image: avatar2, username: "@fletcher", bgColor: "bg-sky-100 dark:bg-sky-500/20", isActive: false },
    { id: 13, image: avatar3, username: "@christina", bgColor: "bg-slate-100 dark:bg-zink-600", isActive: false },
];

const MessageData = [
    { id: 1, image: avatar3, name: "Louisa Howe", isActive: true },
    { id: 2, image: avatar4, name: "Everett Moore", isActive: true },
    { id: 3, image: avatar5, name: "Omari Welch", isActive: true },
    { id: 4, image: avatar6, name: "Paul Gerhold", isActive: true },
    { id: 5, image: avatar7, name: "Green Langworth", isActive: true },
    { id: 6, image: avatar8, name: "Lucie Beahan", isActive: false },
    { id: 7, image: avatar9, name: "Susana Dooley", isActive: false },
];

const PopularEventsData = [
    { id: 1, image: appStore, event: "Music Festivals" },
    { id: 2, image: telegram, event: "Conferences and Seminars" },
    { id: 3, image: android, event: "Business Networking Events" },
    { id: 4, image: slack, event: "Award Ceremonies" }
];

const UpcomingBirthdayData = [
    { id: 1, image: avatar3, name: "Louisa Howe", date: "Today" },
    { id: 2, image: avatar4, name: "Everett Moore", date: "Tomorrow" },
    { id: 3, image: avatar5, name: "Omari Welch", date: "13 Nov" },
    { id: 4, image: avatar6, name: "Paul Gerhold", date: "14 Nov" }
];

const EmailPerformanceData = [
    { id: 1, email: "Adverting & Marketing Agencies", createDate: "05 Aug, 2023", openRate: "18.65%", clickThrough: "2.66%", clickRate: "14.14%", unsubscribed: "0.19%", bounce: "1.29%", spam: "0.03%" },
    { id: 2, email: "Automotive & Aerospace", createDate: "20 Sep, 2023", openRate: "20.13%", clickThrough: "3.44%", clickRate: "18.03%", unsubscribed: "0.18%", bounce: "1.18%", spam: "0.00%" },
    { id: 3, email: "Education", createDate: "04 Jun, 2023", openRate: "18.74%", clickThrough: "2.80%", clickRate: "14.94%", unsubscribed: "0.17%", bounce: "1.35%", spam: "0.02%" },
    { id: 4, email: "Financial Services", createDate: "11 Feb, 2023", openRate: "18.23%", clickThrough: "2.72%", clickRate: "14.79%", unsubscribed: "0.16%", bounce: "1.30%", spam: "0.00%" },
    { id: 5, email: "Food & Beverage", createDate: "26 Nov, 2023", openRate: "15.48%", clickThrough: "1.69%", clickRate: "10.69%", unsubscribed: "0.11%", bounce: "0.63%", spam: "0.00%" },
    { id: 6, email: "Healthcare Services", createDate: "19 July, 2023", openRate: "19.12%", clickThrough: "2.98%", clickRate: "15.11%", unsubscribed: "0.17%", bounce: "1.08%", spam: "0.00%" },
    { id: 7, email: "Professional Services", createDate: "14 Jun, 2023", openRate: "18.14%", clickThrough: "2.39%", clickRate: "12.92%", unsubscribed: "0.17%", bounce: "1.10%", spam: "0.00%" },
    { id: 8, email: "Logistics & Wholesale", createDate: "03 Dec, 2023", openRate: "18.50%", clickThrough: "0.20%", clickRate: "14.84%", unsubscribed: "0.15%", bounce: "1.40%", spam: "0.00%" },
    { id: 9, email: "Real Estate Agents & Brokers", createDate: "03 Dec, 2023", openRate: "18.06%", clickThrough: "2.02%", clickRate: "11.51%", unsubscribed: "0.22%", bounce: "1.18%", spam: "0.00%" },
    { id: 10, email: "Nonprofit", createDate: "03 Dec, 2023", openRate: "20.39%", clickThrough: "2.66%", clickRate: "12.99%", unsubscribed: "0.17%", bounce: "1.09%", spam: "0.01%" },
    { id: 11, email: "Retail", createDate: "03 Dec, 2023", openRate: "14.98%", clickThrough: "2.25%", clickRate: "14.82%", unsubscribed: "0.12%", bounce: "0.69%", spam: "0.01%" },
];

export {
    ProductOrdersData,
    widgetsData,
    AccountsStatsData,
    widgetsData2,
    EmployeePerformanceData, RecentPayrollData, UpcomingInterviewData, UpcomingScheduledData, activeFriendsData, storyData, MessageData, PopularEventsData, UpcomingBirthdayData, EmailPerformanceData
};