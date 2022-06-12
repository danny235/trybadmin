import React from 'react'
import FieldWrapper from './FieldWrapper'
import { WhiteInput } from '../styles/styledUtils';

const BottomBorderInput = ({ formikProps, formikKey, onChangeText, ...rest }) => {
    const inputStyles = {};
    if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
        inputStyles.borderBottomColor = "red";
      }
  return (
    <FieldWrapper formikKey={formikKey} formikProps={formikProps}>
        <WhiteInput 
            onChange={formikProps.handleChange(formikKey)}
            onBlur={formikProps.handleBlur(formikKey)}
            style={inputStyles}
            {...rest}
        />
    </FieldWrapper>
  )
}

export default BottomBorderInput