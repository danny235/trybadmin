import React from "react";
import { colors } from "./colors";


const FieldWrapper = ({ children, formikProps, formikKey }) => {
  return (
    <div style={{marginTop: 4, marginBottom: 4}}>
      
      {children}
      <p style={{color: "red"}}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </p>
    </div>
  );
};

export default FieldWrapper