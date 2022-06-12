import Login from "../auth/Login";
import BetStatistics from "../main/BetStatistics";
import Dashboard from "../main/Dashboard";
import Deposit from "../main/Deposit";
import Withdrawal from "../main/Withdrawal";
import UsersOverView from "../main/UsersOverView"

const unAuthRoutes = [
 
  {
    pathname: "/",
    exact: true,
    name: "login",
    id: "login",
    component: <Login />,
  }
];

const authRoutes = [
  {
    pathname: "/",
    exact: true,
    name: "dashboard",
    id: "dashboard",
    component: <Dashboard />
  },
  {
    pathname: "/bet-statistics",
    exact: true,
    name: "betStatistics",
    id: "betStatistics",
    component: <BetStatistics />
},
  {
    pathname: "/deposit-history",
    exact: true,
    name: "deposit",
    id: "deposit",
    component: <Deposit />
},
  {
    pathname: "/withdrawal-history",
    exact: true,
    name: "withdrawal",
    id: "withdrawal",
    component: <Withdrawal />
},
  {
    pathname: "/users-overview",
    exact: true,
    name: "dashboard",
    id: "dashboard",
    component: <UsersOverView />
},
 

];

export { unAuthRoutes, authRoutes };
