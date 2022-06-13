import React from "react";
import { Icon } from "@iconify/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container, CustomColoredBtn } from "../styles/styledUtils";
import { colors } from "../components/colors";

const DepositHistory = () => {
  const navigate = useNavigate();
  const depositHistory = [
    {
      id: 1,
      date: "Feb 12 2022",
      time: "9:15am",
      amount: "$100",
      status: "Successful",
    },
    {
      id: 2,
      date: "Feb 12 2022",
      time: "9:15am",
      amount: "$100",
      status: "Successful",
    },
    {
      id: 3,
      date: "Feb 12 2022",
      time: "9:15am",
      amount: "$100",
      status: "Successful",
    },
    {
      id: 4,
      date: "Feb 12 2022",
      time: "9:15am",
      amount: "$100",
      status: "Successful",
    },
    {
      id: 5,
      date: "Feb 12 2022",
      time: "9:15am",
      amount: "$100",
      status: "Successful",
    },
    {
      id: 6,
      date: "Feb 12 2022",
      time: "9:15am",
      amount: "$100",
      status: "Successful",
    },
    {
      id: 7,
      date: "Feb 12 2022",
      time: "9:15am",
      amount: "$100",
      status: "Successful",
    },
  ];
  return (
    <div>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 40,
          }}
        >
          <Icon
            icon="akar-icons:arrow-back"
            style={{ width: 30, height: 30, marginTop: -15 }}
            onClick={() => navigate(-1)}
          />
          <h2 style={{ marginLeft: 10 }}>Deposits</h2>
        </div>

        <h3>Pending deposits</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            gap: 60,
            flexWrap: "wrap",
          }}
        >
          {depositHistory?.map((item) => {
            return (
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 10}} key={item.id}>
                <img
                  src="https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80"
                  alt="coin"
                  style={{ width: 100, height: 100, borderRadius: 20 }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                    marginBottom: 15,
                    alignItems: "center",
                  }}
                >
                  <CustomColoredBtn
                    bgColor={colors.secondary}
                    style={{fontSize: 10, fontWeight: '400', width: 50, }}
                  >
                    Approve
                  </CustomColoredBtn>
                  
                  <CustomColoredBtn
                    bgColor={colors.red}
                    style={{fontSize: 10, fontWeight: '400', width: 50, }}
                  >
                    Reject
                  </CustomColoredBtn>
                </div>
              </div>
            );
          })}
        </div>
        <h3>Completed</h3>
        <div
          style={{
            padding: 15,
            borderRadius: 40,
            display: "flex",
            alignItems: "center",

            marginTop: 20,
            gap: 70,
            flexWrap: "wrap",
          }}
        >
          {depositHistory?.map((item) => {
            return (
              <div key={item.id}>
                <img
                  src="https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80"
                  alt="coin"
                  style={{ width: 100, height: 100, borderRadius: 20 }}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

const styles = {
  cellStyle: {
    fontWeight: "bold",
  },
};

export default DepositHistory;
