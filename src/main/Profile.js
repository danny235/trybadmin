import React, {useEffect} from "react";
import {
  Container,
  GreenSection,
  SecondaryBtn,
  StyledInput,
  WhiteInput,
} from "../styles/styledUtils";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../features/user/userSlice";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProfile, token } = useSelector((state) => state.user);
  const handleLogOut = () => {
    navigate("/", { replace: true });
    dispatch(logOutUser());
  };

  useEffect(() => {
    if (token === "") {
      navigate("/", { replace: true });
    }
    return;
  }, [token]);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 40,
          flex: 1,
        }}
      >
        <Icon
          icon="akar-icons:arrow-back"
          style={{ width: 30, height: 30, marginTop: -15 }}
          onClick={() => navigate(-1)}
        />
        <h2 style={{ marginLeft: 10 }}>Profile Settings</h2>
      </div>
      <GreenSection style={{ marginBottom: 100 }}>
        <div>
          <p style={{ color: "#fff" }}>Username</p>
          <StyledInput
            style={{
              borderColor: "#fff",
              background: "none",
              color: "#fff",
              marginTop: 1,
              textTransform: "capitalize",
            }}
            defaultValue={userProfile?.username}
            readOnly
          />
        </div>
        <div>
          <p style={{ color: "#fff" }}>Email</p>
          <StyledInput
            style={{
              borderColor: "#fff",
              background: "none",
              color: "#fff",
              marginTop: 1,
            }}
            defaultValue={userProfile?.email}
            readOnly
          />
        </div>
        <div style={{ position: "relative" }}>
          <WhiteInput placeholder="Password change" readOnly />
          <button
            style={{
              position: "absolute",
              outline: "none",
              background: "none",
              color: "blue",
              border: "none",
              right: 3,
              top: 7,
            }}
          >
            Edit
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <WhiteInput placeholder="Transaction pin" readOnly />
          <button
            style={{
              position: "absolute",
              outline: "none",
              background: "none",
              color: "blue",
              border: "none",
              right: 3,
              top: 7,
            }}
          >
            Edit
          </button>
        </div>
      </GreenSection>
      <SecondaryBtn onClick={() => handleLogOut()} style={{ color: "#fff" }}>
        <p>Logout</p>
      </SecondaryBtn>
    </Container>
  );
};

export default Profile;
