import React, { useState } from "react";
import { Container, SecondaryBtn } from "../styles/styledUtils";
import * as yup from "yup";
import { Formik } from "formik";
import Input from "../components/Input";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { baseUrl, paths } from "../config/index";
import { toast } from "react-toastify";
import {updateToken, updateRefreshToken} from "../features/user/userSlice"

const validationSchema = yup.object().shape({
  username: yup.string().required().label("Username"),
  email: yup.string().required().label("Email").email(),
  password: yup
    .string()
    .required()
    .label("Password")
    .min(8, "Seems a bit short"),
  confirm_password: yup
    .string()
    .required()
    .label("Confirm Password")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
  referral_code: yup.string().label("Referral Code"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const {code} = useParams()
  console.log(code)
  const handleSubmit = async (person) => {
    try {
      setIsFetching(true);
      const response = await axios.post(`${baseUrl}/${paths.register}`, person);
      console.log(response.data);
      if (response.status === 200) {
        dispatch(updateToken(response.data.access));
        dispatch(updateRefreshToken(response.data.refresh));
        toast.success("Registration Successful");
        setIsFetching(false)
        navigate("/", { replace: true });
      }
      
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
      setIsFetching(false);
    }
  };
  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
          marginBottom: 40,
        }}
      >
        <Icon
          icon="akar-icons:arrow-back"
          style={{ width: 30, height: 30, marginTop: -15 }}
          onClick={() => navigate(-1)}
        />
        <h2 style={{ marginLeft: 10 }}>Register</h2>
      </div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirm_password: "",
          referral_code: code ? code.substring(1, code.length) : "",
        }}
        onSubmit={(values, actions) => {
          const person = {
            email: values.email,
            password: values.password,
            re_password: values.confirm_password,
            is_superuser: false,
            username: values.username,
            referral_code: values.referral_code,
          };
          handleSubmit(person);
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <div>
            <Input
              formikProps={formikProps}
              formikKey="username"
              placeholder="Username"
              value={formikProps.values.username}
            />
            <Input
              formikProps={formikProps}
              formikKey="email"
              placeholder="Email"
              keyboardType="email-address"
              value={formikProps.values.email}
            />
            <div style={{ position: "relative" }}>
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                formikProps={formikProps}
                formikKey="password"
                placeholder="Password"
                value={formikProps.values.password}
              />
              <Icon
                icon={
                  showPassword
                    ? "clarity:eye-show-line"
                    : "clarity:eye-hide-line"
                }
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  top: 22,
                  right: 10,
                }}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div style={{ position: "relative" }}>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                formikProps={formikProps}
                formikKey="confirm_password"
                placeholder="Confirm Password"
                value={formikProps.values.confirm_password}
              />
              <Icon
                icon={
                  showConfirmPassword
                    ? "clarity:eye-show-line"
                    : "clarity:eye-hide-line"
                }
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  top: 22,
                  right: 10,
                }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            <div style={{ position: "relative", marginBottom: 100 }}>
              <Input
                formikProps={formikProps}
                formikKey="referral_code"
                placeholder="123456"
                type="numeric"
                value={formikProps.values.referral_code}
                maxLength={7}
              />
              <p
                style={{
                  position: "absolute",
                  top: 26,
                  right: 10,
                  fontWeight: "bold",
                }}
              >
                Referral code
              </p>
              
            </div>
            <SecondaryBtn
              disabled={isFetching}
              type="submit"
              onClick={formikProps.handleSubmit}
            >
              {isFetching ? <p>Loading...</p> : <p>Register</p>}
            </SecondaryBtn>
          </div>
        )}
      </Formik>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>Already have an account?</p>{" "}
        <Link style={{ textDecoration: "none" }} to="/login">
          Login
        </Link>
      </div>
    </Container>
  );
};

export default SignUp;
