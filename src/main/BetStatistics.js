import React, { useState } from "react";
import {
  Container,
  OptionCircle,
  CustomColoredBtn,
  CustomModal,
} from "../styles/styledUtils";
import { colors } from "../components/colors";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";

const BetStatistics = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  return (
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
        <h2 style={{ marginLeft: 10 }}>Bet statistics</h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <div>
          <OptionCircle color={colors.secondary}>
            <h1>Big</h1>
          </OptionCircle>
          <h2 style={styles.betAmountText}>500</h2>
        </div>
        <h1 style={{ fontSize: 60 }}>-</h1>
        <div>
          <OptionCircle color={colors.red}>
            <h1>Small</h1>
          </OptionCircle>
          <h2 style={styles.betAmountText}>1000</h2>
        </div>
      </div>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <p>Time remaining:</p>
        <p>2:59</p>
      </div>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginTop: 20, marginBottom: 20}}>
        <h2 style={{textAlign: "center"}}>Ratio</h2>
        <h3 style={{textAlign: "center", fontWeight: "400"}}>Big : Small = 500 : 1000</h3>
        <h2 style={{textAlign: "center"}}>Choose which to win/loose</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 25,
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <CustomColoredBtn
          bgColor={colors.secondary}
          onClick={() => setOpen(true)}
        >
          Big
        </CustomColoredBtn>
        <h5>or</h5>
        <CustomColoredBtn bgColor={colors.red} onClick={() => setOpen(true)}>
          Small
        </CustomColoredBtn>
      </div>
      <Backdrop open={open}>
        <CustomModal height={300} width={85}>
          <h3 style={{ textAlign: "center", marginBottom: 10 }}>
            Do you want to continue?
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 25,
              marginBottom: 15,
              alignItems: 'center'
            }}
          >
            <CustomColoredBtn
              bgColor={colors.secondary}
              onClick={() => setOpen(true)}
            >
              Yes
            </CustomColoredBtn>
            <h5>or</h5>
            <CustomColoredBtn
              bgColor={colors.red}
              onClick={() => setOpen(false)}
            >
              No
            </CustomColoredBtn>
          </div>
        </CustomModal>
      </Backdrop>
    </Container>
  );
};

const styles = {
  betAmountText: {
    textAlign: "center",
    fontSize: 18,
  }

};

export default BetStatistics;
