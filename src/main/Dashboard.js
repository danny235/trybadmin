import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dp, profileBackground } from "../assets";
import Brand from "../components/Brand";
import MenuList from "../components/MenuList";
import {
  Container,
  SecondaryBtn,
  StyledProfileBackground,
  WhiteSection,
} from "../styles/styledUtils";
import { baseUrl, paths } from "../config/index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateUserFetching } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { colors } from "../components/colors";

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { userProfile, token } = useSelector((state) => state.user);
  const menuRoutes = [
    {
      id: 1,
      name: "Betting statistics",
      icon: "icon-park-outline:funds",
      color: "#fff",
      route: "/bet-statistics",
    },
    {
      id: 2,
      name: "Deposits",
      icon: "heroicons-solid:receipt-refund",
      color: "#fff",
      // route: "#",
      route: "/deposit-history",
    },
    {
      id: 3,
      name: "Withdrawal",
      icon: "uil:money-withdrawal",
      color: "#fff",
      route: "/withdrawal-history",
      // route: "#",
    },
    {
      id: 4,
      name: "Users overview",
      icon: "gridicons:multiple-users",
      color: "#fff",
      route: "/users-overview",
      // route: "#",
    },
  ];
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const fetchUser = async () => {
  //   try {
  //     dispatch(updateUserFetching(true));
  //     const response = await axios.get(`${baseUrl}/${paths.currentUser}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     if (response.status === 200) {
  //       dispatch(updateUser(response.data));
  //       dispatch(updateUserFetching(false));
  //     }
  //   } catch (err) {
  //     dispatch(updateUserFetching(false));
  //     toast.error(err.message);
  //   }
  // };
  // useEffect(() => {
  //   fetchUser();
  // }, [token]);

  return (
    <div>
      <div style={styles.headerStyle}>
        <Brand style={{ flex: 1 }} />
      </div>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <h1>Total balance</h1>
        <h1>$200,000</h1>
      </div>
    
      <div style={styles.menuListContainer}>
        {menuRoutes.map(({ id, name, icon, color, route }) => (
          <Link
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              
            }}
            key={id}
            to={route}
          >
            <div
              style={{
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 120,
                width: 120,
                flexDirection: "column",
                backgroundColor: colors.secondary
              }}
            >
              <Icon
                style={{ color: color, width: 40, height: 40 }}
                icon={icon}
              />
            <p style={{ color: "#fff", textAlign: "center", width: "90%" }}>
              {name}
            </p>
            </div>
          </Link>
        ))}
      </div>
     
    </div>
  );
};

const styles = {
  headerStyle: {
    display: "flex",
    padding: 10,
  },
  hamburgerStyle: {
    background: "none",
    outline: "none",
    border: "none",
  },
  menuListContainer: {
    padding: 15,
    borderRadius: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    gap: 70,
    flexWrap: "wrap",
  },
};

export default Dashboard;
