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
      name: "Deposit History",
      icon: "ic:outline-history",
      color: "#2a11c1",
      route: "/deposit-history",
    },
    {
      id: 2,
      name: "Withdrawal History",
      icon: "ic:twotone-history-edu",
      color: "#ef5da8",
      route: "/withdrawal-history",
    },
    {
      id: 3,
      name: "Profile settings",
      icon: "ri:user-settings-fill",
      color: "#7879f1",
      route: "/profile-settings",
    },
    {
      id: 4,
      name: "Trade",
      icon: "bx:coin-stack",
      color: colors.lighterSecondary,
      route: "/trade",
    },
    {
      id: 5,
      name: "Invitation",
      icon: "fa-solid:user-friends",
      color: "#2a11c1",
      route: "/invitation",
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      dispatch(updateUserFetching(true));
      const response = await axios.get(`${baseUrl}/${paths.currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        dispatch(updateUser(response.data));
        dispatch(updateUserFetching(false));
      }
    } catch (err) {
      dispatch(updateUserFetching(false));
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <div>
      <div style={styles.headerStyle}>
        <Brand style={{ flex: 1 }} />
        <button onClick={() => setShowMenu(true)} style={styles.hamburgerStyle}>
          <svg
            width="36"
            height="25"
            viewBox="0 0 36 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="5" fill="black" />
            <rect y="10" width="36" height="5" fill="black" />
            <rect y="20" width="36" height="5" fill="black" />
          </svg>
        </button>
      </div>
      <StyledProfileBackground>
        <Container>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ width: 52, height: 50, borderRadius: 50 }}
              src={
                userProfile?.profile?.image_url === ""
                  ? dp
                  : `${userProfile?.profile?.image_url}`
              }
              alt="profile"
            />
            <div style={{ paddingTop: 20, paddingLeft: 20 }}>
              <h3 style={{ color: "#fff", textTransform: "capitalize" }}>
                {userProfile?.username === "" ? "----" : userProfile?.username}
              </h3>
              <p style={{ color: "#fff" }}>
                Invitation code: {userProfile?.profile?.user_referral_code}
              </p>
            </div>
          </div>
          <WhiteSection>
            <div>
              <p style={{ fontWeight: "bold" }}>My balance</p>
              <p style={{ fontWeight: "bold" }}>$100</p>
            </div>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000",
                  border: "2px solid #ef5da8",
                  width: 100,
                  height: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  fontWeight: "bold",
                  fontSize: 15,
                }}
                to="/withdraw"
              >
                Withdraw
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000",
                  border: "2px solid #ef5da8",
                  width: 100,
                  height: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  fontWeight: "bold",
                  fontSize: 15,
                }}
                to="/deposit"
              >
                Deposit
              </Link>
            </div>
          </WhiteSection>
        </Container>
      </StyledProfileBackground>
    

      <div style={styles.menuListContainer}>
        {menuRoutes.map(({ id, name, icon, color, route }) => (
          <Link
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "30%",
            }}
            key={id}
            to={route}
          >
            <div
              style={{
                borderRadius: 50,
                border: `2px solid ${color}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 70,
                width: 70,
              }}
            >
              <Icon
                style={{ color: color, width: 40, height: 40 }}
                icon={icon}
              />
            </div>
            <p style={{ color: "#000", textAlign: "center", width: "90%" }}>
              {name}
            </p>
          </Link>
        ))}
      </div>
      {showMenu && <MenuList onClick={() => setShowMenu(false)} />}
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
    gap: 10,
    flexWrap: "wrap",
    border: "2px solid #ccc",
  },
};

export default Dashboard;
