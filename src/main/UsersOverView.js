import React, { useState, useEffect } from "react";
import Brand from "../components/Brand";
import { Icon } from "@iconify/react";
import callAPI from "../utils";
import { colors } from "../components/colors";
import {
  AmountInput,
  Container,
  CustomColoredBtn,
  CustomModal,
} from "../styles/styledUtils";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Backdrop from "@mui/material/Backdrop";
import MenuList from "../components/MenuList";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const UsersOverView = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const usersList = [
    {
      id: 1,
      username: "Dada",
      email: "dada@gmail.com",
      creationDate: "1/02/2022 4:44pm",
      lastLogin: "1/02/2022 4:44pm",
    },
    {
      id: 2,
      username: "Mala",
      email: "dada@gmail.com",
      creationDate: "1/02/2022 4:44pm",
      lastLogin: "1/02/2022 4:44pm",
    },
    {
      id: 3,
      username: "Jada",
      email: "dada@gmail.com",
      creationDate: "1/02/2022 4:44pm",
      lastLogin: "1/02/2022 4:44pm",
    },
    {
      id: 4,
      username: "Lada",
      email: "dada@gmail.com",
      creationDate: "1/02/2022 4:44pm",
      lastLogin: "1/02/2022 4:44pm",
    },
    {
      id: 5,
      username: "Cada",
      email: "dada@gmail.com",
      creationDate: "1/02/2022 4:44pm",
      lastLogin: "1/02/2022 4:44pm",
    },
    {
      id: 6,
      username: "Hada",
      email: "dada@gmail.com",
      creationDate: "1/02/2022 4:44pm",
      lastLogin: "1/02/2022 4:44pm",
    },
    {
      id: 7,
      username: "Rada",
      email: "dada@gmail.com",
      creationDate: "1/02/2022 4:44pm",
      lastLogin: "1/02/2022 4:44pm",
    },
    {
      id: 8,
      username: "Dada",
      email: "dada@gmail.com",
      creationDate: "1/02/2022 4:44pm",
      lastLogin: "1/02/2022 4:44pm",
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
          fontWeight: 500,
          fontSize: 22,
          paddingLeft: 12,
        }}
      >
        <Icon
          icon="akar-icons:arrow-back"
          style={{ width: 30, height: 30, marginTop: -8, marginRight: 10 }}
          onClick={() => navigate(-1)}
        />{" "}
        Users OverView
      </div>
      <Container>
        <div>
          <input
            placeholder="Search username"
            style={{
              outline: "none",
              padding: 10,
              borderRadius: 10
            }}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            name="search"
            type="text"
          />
        </div>
        <TableContainer>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.cellStyle}>Username</TableCell>
                <TableCell style={styles.cellStyle}>Email</TableCell>
                <TableCell style={styles.cellStyle}>Creation date</TableCell>
                <TableCell style={styles.cellStyle}>Last login</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList
                .filter((row) => row.username.toLowerCase().search(query) !== -1)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={styles.cellStyle}
                      component="th"
                      scope="row"
                    >
                      {row.username}
                    </TableCell>
                    <TableCell style={styles.cellStyle} align="right">
                      {row.email}
                    </TableCell>
                    <TableCell style={styles.cellStyle} align="right">
                      {row.creationDate}
                    </TableCell>
                    <TableCell style={styles.cellStyle} align="center">
                      {row.lastLogin}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

const styles = {
  textStyle: {
    fontWeight: "bold",
  },
  linkStyle: {
    textDecoration: "none",
    color: "#000",
  },
};

export default UsersOverView;
