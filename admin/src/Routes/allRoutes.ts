import Dashboard from "pages/Dashboard/Analytics";
import Shops from "pages/Shops/ListView";
import Items from "pages/Items/ListView";
import Orders from "pages/Orders/ListView";
import UsersTable from "pages/Users/ListView";
import CitiesTable from "pages/Cities/ListView";
import UserProfile from "pages/UserProfile";
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

let authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/", component: Dashboard },
  { path: "/dashboard", component: Dashboard },

  // Users
  { path: "/users", component: UsersTable },
  // Cities
  { path: "/cities", component: CitiesTable },

  // Drivers
  { path: "/shops", component: Shops },

  // Items
  { path: "/items", component: Items },

  // Orders
  { path: "/orders", component: Orders },

  // profile
  { path: "/user-profile", component: UserProfile },
];

const publicRoutes = [
  // authentication
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
];

export { authProtectedRoutes, publicRoutes };
