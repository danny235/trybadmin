import React from "react";
import Logo from "../components/Logo";
import { Container, SecondaryBtn, WhiteBtn } from "../styles/styledUtils";
import { Link } from "react-router-dom";

const AuthRoot = () => {
  return (
    <Container>
      <div style={styles.logoContainerStyle}>
        <Logo style={styles.logoStyle} />
        <h2>TrybNetwork</h2>
      </div>
      <Link style={styles.linkStyle} to="/login">
        <SecondaryBtn>
          <p style={styles.btnText}>Login</p>
        </SecondaryBtn>
      </Link>
      <Link style={styles.linkStyle} to="/signup">
        <WhiteBtn>
          <p style={styles.btnText}>Sign Up</p>
        </WhiteBtn>
      </Link>
    </Container>
  );
};

const styles = {
  logoContainerStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 180,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 100
  },
  logoStyle: {
    width: 200,
    height: 200,
  },
  linkStyle: {
      textDecoration: "none"
  },
  btnText: {
      fontSize: 17,
      fontWeight: 'bold'
  }
};

export default AuthRoot;
