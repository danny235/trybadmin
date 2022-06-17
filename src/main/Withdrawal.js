import React, { useState, useEffect } from "react";
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
import { Dialog } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateWithdrawalHistory } from "../features/user/userSlice";
import { baseUrl, paths } from "../config";
import { toast } from "react-toastify";

const WithdrawalHistory = () => {
  const navigate = useNavigate();
  const { withdrawalHistory, token } = useSelector((state) => state.user);
  const [modalItem, setModalItem] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();
  const fetchWithdraws = async () => {
    try {
      const response = await axios.get(`${baseUrl}/${paths.withdrawalList}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(updateWithdrawalHistory(response.data));
      }
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateWithdrawal = async (status, txnId) => {
    setUpdating(true);
    try {
      const response = await axios.patch(
        `${baseUrl}/wallet/withdraw/${txnId}/${paths.update}`,
        status,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUpdating(false);
        toast.success(response?.data?.message);
      }
      console.log(response);
    } catch (err) {
      setUpdating(false);
      console.log(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchWithdraws();
  }, []);
  return (
    <div>
      <Container>
        <Dialog
          fullWidth={true}
          onBackdropClick={() => setModalShow(false)}
          open={modalShow}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              height: 420,
              paddingTop: 40,
            }}
          >
            <img
              src={modalItem?.screenshot_url}
              alt="coin"
              style={{ width: 150, height: 200, borderRadius: 20 }}
            />
            <p style={{ fontWeight: "bold" }}>
              Amount: {modalItem?.amount_to_deposit}
            </p>
            <p style={{ fontWeight: "bold" }}>Address: </p>
            <p
              style={{
                fontWeight: "bold",
                wordWrap: "break-word",
                width: "90%",
                textAlign: "center",
              }}
            >
              {modalItem?.wallet_address}{" "}
            </p>
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
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  width: 70,
                  height: 40,
                }}
                disabled={updating}
                onClick={() =>
                  updateWithdrawal(
                    { approved: true, rejected: false },
                    modalItem?.trans_id
                  )
                }
              >
                {updating ? "Updating" : "Approve"}
              </CustomColoredBtn>

              <CustomColoredBtn
                bgColor={colors.red}
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  width: 70,
                  height: 40,
                }}
                disabled={updating}
                onClick={() =>
                  updateWithdrawal(
                    { rejected: true, approved: false },
                    modalItem?.trans_id
                  )
                }
              >
                {updating ? "Updating" : "Reject"}
              </CustomColoredBtn>
            </div>
          </div>
        </Dialog>
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
        {withdrawalHistory.length !== 0 ? (
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
                {withdrawalHistory?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => {
                      setModalItem(row);
                      setModalShow(true);
                    }}
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
                            style={{
                              fontSize: 10,
                              fontWeight: "400",
                              width: 50,
                            }}
                          >
                            Approve
                          </CustomColoredBtn>

                          <CustomColoredBtn
                            bgColor={colors.red}
                            style={{
                              fontSize: 10,
                              fontWeight: "400",
                              width: 50,
                            }}
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
        ) : (
          <p style={{ textAlign: "center" }}>No Withdrawal History</p>
        )}
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
