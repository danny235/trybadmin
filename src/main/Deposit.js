import React, { useEffect, useState, useReducer } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  CustomColoredBtn,
  CustomModal,
} from "../styles/styledUtils";
import { colors } from "../components/colors";
import { Dialog } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateDepositHistory } from "../features/user/userSlice";
import { baseUrl, paths } from "../config";
import { toast } from "react-toastify";

const DepositHistory = () => {
  const navigate = useNavigate();
  const { depositHistory, token } = useSelector((state) => state.user);
  const [modalItem, setModalItem] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();
  const [reducerValue, forceUpdate] = useReducer(x=>x+1,0)
  const fetchDeposits = async () => {
    try {
      const response = await axios.get(`${baseUrl}/${paths.depositList}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(updateDepositHistory(response.data));
      }
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateDeposit = async (status, txnId) => {
    setUpdating(true);
    try {
      const response = await axios.patch(
        `${baseUrl}/wallet/deposit/${txnId}/${paths.update}`,
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
        setModalShow(false)
        forceUpdate()
      }
      console.log(response);
    } catch (err) {
      setUpdating(false);
      console.log(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, [reducerValue]);

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
                  updateDeposit(
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
                  updateDeposit(
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
          {depositHistory
            ?.filter(
              (item) => item?.approved === false && item?.rejected === false
            )
            ?.map((item) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                  key={item.id}
                >
                  <img
                    onClick={() => {
                      setModalItem(item);
                      setModalShow(true);
                    }}
                    src={item?.screenshot_url}
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
                      style={{ fontSize: 10, fontWeight: "400", width: 50 }}
                      onClick={() =>
                        updateDeposit(
                          { approved: true, rejected: false },
                          item?.trans_id
                        )
                      }
                      
                    >
                      {updating ? "Updating" : "Approve"}
                    </CustomColoredBtn>

                    <CustomColoredBtn
                      bgColor={colors.red}
                      style={{ fontSize: 10, fontWeight: "400", width: 50 }}
                      onClick={() =>
                        updateDeposit(
                          { rejected: true, approved: false },
                          item?.trans_id
                        )
                      }
                      
                    >
                      {updating ? "Updating" : " Reject"}
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
          {depositHistory
            ?.filter((item) => item?.approved === true)
            ?.map((item) => {
              return (
                <div key={item.id}>
                  <img
                    src={item?.screenshot_url}
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



export default DepositHistory;
