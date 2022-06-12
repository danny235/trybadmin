import React from 'react'
import { StyledInput } from '../styles/styledUtils';
import FieldWrapper from './FieldWrapper'

const Input = ({ formikProps, formikKey, onChangeText, ...rest }) => {
    const inputStyles = {};
    if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
        inputStyles.borderColor = "red";
      }
  return (
    <FieldWrapper formikKey={formikKey} formikProps={formikProps}>
        <StyledInput 
            onChange={formikProps.handleChange(formikKey)}
            onBlur={formikProps.handleBlur(formikKey)}
            style={inputStyles}
            {...rest}
        />
    </FieldWrapper>
  )
}

export default Input