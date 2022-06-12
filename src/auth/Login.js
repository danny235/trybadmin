import React, { useState } from "react";
import { Container, SecondaryBtn } from "../styles/styledUtils";
import * as yup from "yup";
import { Formik } from "formik";
import Input from "../components/Input";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl, paths } from "../config/index";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateToken, updateRefreshToken } from "../features/user/userSlice";

const validationSchema = yup.object().shape({
  email: yup.string().required().label("Email").email(),
  password: yup
    .string()
    .required()
    .label("Password")
    .min(8, "Seems a bit short"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (person) => {
    try {
      setIsFetching(true);
      const response = await axios.post(`${baseUrl}/${paths.login}`, person);
      console.log(response);

      if (response.status === 200) {
        dispatch(updateToken(response.data.access));
        dispatch(updateRefreshToken(response.data.refresh));
        toast.success("Successful");
        setIsFetching(false);
        navigate("/", { replace: true });
      }
      console.log("hi");
    } catch (err) {
      if (err.message === "Request failed with status code 401") {
        toast.error("Invalid credentials");
        setIsFetching(false);
        return
      } 
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
        <h2 style={{ marginLeft: 10 }}>Login</h2>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          const person = {
            email: values.email,
            password: values.password,
          };
          handleSubmit(person);
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <div>
            <Input
              formikProps={formikProps}
              formikKey="email"
              placeholder="Email"
              type="email"
              value={formikProps.values.email}
            />

            <div style={{ position: "relative", marginBottom: 100 }}>
              <Input
                type={showPassword ? "text" : "password"}
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
              <Link style={styles.linkStyle} to="#">
                Forgot password?
              </Link>
            </div>
            <SecondaryBtn
              disabled={isFetching}
              type="submit"
              onClick={formikProps.handleSubmit}
            >
              {isFetching ? <p>Loading...</p> : <p>Login</p>}
            </SecondaryBtn>
          </div>
        )}
      </Formik>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>Don't have an account?</p>{" "}
        <Link style={styles.linkStyle} to="/signup">
          Register here
        </Link>
      </div>
    </Container>
  );
};

const styles = {
  linkStyle: {
    textDecoration: "none",
  },
};

export default Login;
