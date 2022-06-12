import React from "react";
import Brand from "../components/Brand";
import { Container } from "../styles/styledUtils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { colors } from "../components/colors";

const BetHistory = () => {
  const betHistory = [
    {
      id: 1,
      type: "Big",
      amount: "$10",
      outcome: "Ongoing",
      profit: "-",
    },
    {
      id: 2,
      type: "Small",
      amount: "$10",
      outcome: "Win",
      profit: "+$12",
    },
    {
      id: 3,
      type: "Big",
      amount: "$10",
      outcome: "Lost",
      profit: "-",
    },
    {
      id: 4,
      type: "Small",
      amount: "$10",
      outcome: "Win",
      profit: "+$12",
    },
    {
      id: 5,
      type: "Big",
      amount: "$10",
      outcome: "Win",
      profit: "+$12",
    },
    {
      id: 6,
      type: "Big",
      amount: "$10",
      outcome: "Lost",
      profit: "-",
    },
    {
      id: 7,
      type: "Big",
      amount: "$10",
      outcome: "Win",
      profit: "+$12",
    },
    {
      id: 8,
      type: "Small",
      amount: "$10",
      outcome: "Lost",
      profit: "-",
    },
    {
      id: 9,
      type: "Small",
      amount: "$10",
      outcome: "Lost",
      profit: "-",
    },
  ];
  return (
    <Container>
      <Brand
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      />
      <h2 style={{ textAlign: "center", marginBottom: 10 }}>Bet history</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={styles.cellStyle}>Type</TableCell>
              <TableCell style={styles.cellStyle}>Amount</TableCell>
              <TableCell style={styles.cellStyle}>Outcome</TableCell>
              <TableCell style={styles.cellStyle}>Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {betHistory.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={{...styles.cellStyle, 
                    color:
                      row.type === "Big"
                        ? colors.secondary
                        :  colors.red,
                  }} component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell style={{...styles.cellStyle, color: colors.secondary}} align="right">{row.amount}</TableCell>
                <TableCell
                  style={{...styles.cellStyle, 
                    color:
                      row.outcome === "Ongoing"
                        ? colors.yellow
                        : row.outcome === "Win"
                        ? colors.secondary
                        : colors.red,
                  }}
                  align="right"
                >
                  {row.outcome}
                </TableCell>
                <TableCell style={{...styles.cellStyle, color: colors.secondary }} align="right">
                  {row.profit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const styles = {
    cellStyle: {
        fontWeight: 'bold'
    }
}

export default BetHistory;
