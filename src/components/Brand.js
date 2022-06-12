import React from "react";
import { Container } from "../styles/styledUtils";
import { colors } from "./colors";
import Logo from "./Logo";

const Brand = ({...rest}) => {
  return (
    <div {...rest}>
      <div style={{ display: "flex", alignItems: 'center', }}>
        <Logo style={{ width: 50, height: 50, marginRight: 10 }} />
        <div style={{ display: "flex" }}>
          <h2 style={styles.brandName}>
            Tryb
          </h2>
            <h2 style={{...styles.brandName, color: colors.lighterSecondary}}>Network</h2>
        </div>
      </div>
    </div>
  );
};

const styles = {
    brandName: {
        fontSize: 16
    }
}

export default Brand;
