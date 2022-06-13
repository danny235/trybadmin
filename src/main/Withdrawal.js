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

const WithdrawalHistory = () => {
  const navigate = useNavigate();
  const withdrawalHistory = [
    {
      id: 1,
      amount: "$100",
      status: "Pending",
      name: "Mary21",
    },
    {
      id: 2,
      amount: "$100",
      status: "Approved",
      name: "Mary21",
    },
    {
      id: 3,
      amount: "$100",
      status: "Approved",
      name: "Mary21",
    },
    {
      id: 4,
      amount: "$100",
      status: "Pending",
      name: "Mary21",
    },
    {
      id: 5,
      amount: "$100",
      status: "Approved",
      name: "Mary21",
    },
    {
      id: 6,
      amount: "$100",
      status: "Pending",
      name: "Mary21",
    },
    {
      id: 7,
      amount: "$100",
      status: "Pending",
      name: "Mary21",
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
            <h2 style={{ marginLeft: 10 }}>Withdrawal history</h2>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.cellStyle}>Usernames</TableCell>
                <TableCell style={styles.cellStyle}>Amount</TableCell>
                <TableCell style={styles.cellStyle}>Status</TableCell>
                <TableCell style={styles.cellStyle}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {withdrawalHistory.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={styles.cellStyle}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell style={styles.cellStyle} align="right">
                    {row.amount}
                  </TableCell>
                  <TableCell style={styles.cellStyle} align="right">
                    {row.status}
                  </TableCell>
                  <TableCell style={styles.cellStyle} align="center">
                    {row.status === "Pending" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        <CustomColoredBtn
                          bgColor={colors.secondary}
                          style={{ fontSize: 10, fontWeight: "400", width: 50 }}
                        >
                          Approve
                        </CustomColoredBtn>

                        <CustomColoredBtn
                          bgColor={colors.red}
                          style={{ fontSize: 10, fontWeight: "400", width: 50 }}
                        >
                          Reject
                        </CustomColoredBtn>
                      </div>
                    ) : null}
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
  cellStyle: {
    fontWeight: "bold",
  },
};

export default WithdrawalHistory;
