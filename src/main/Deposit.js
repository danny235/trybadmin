import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addressQR } from "../assets";
import { Container, SecondaryBtn, UploadField } from "../styles/styledUtils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Alert from "@mui/material/Alert";
import * as yup from "yup";
import { Formik, replace } from "formik";
import Input from "../components/Input";

const validationSchema = yup.object().shape({
  amount: yup.string().required().label("Amount"),
  screenshot: yup.string().required().label("screenshot"),
});

const Deposit = () => {
  const [walletId] = useState(
    "TWaNLzBT3t6LWTmDRhUUG3JGheimpngj7y"
    );
    const [copied, setCopied] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
    return () => {};
  }, []);

  return (
    <div>
      <Container>
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
              flex: 1,
            }}
          >
            <Icon
              icon="akar-icons:arrow-back"
              style={{ width: 30, height: 30, marginTop: -15 }}
              onClick={() => navigate(-1)}
            />
            <h2 style={{ marginLeft: 10 }}>Deposit</h2>
          </div>
          <Link style={{textDecoration: "none", color: "#000"}} to="/deposit-history">
            <Icon
              style={{ width: 25, height: 25, marginTop: -35 }}
              icon="ic:outline-history"
            />
          </Link>
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>QR code</h3>
          <img style={styles.qrStyle} src={addressQR} alt="QR" />
          <p style={{ textAlign: "center" }}>
            Send only USDT TRC20 to the deposit address
          </p>
        </div>
      </Container>
      <hr />
      <Container>
        <div style={{ width: "80%" }}>
          <p>Network</p>
          <h3 style={{ fontSize: 14, fontWeight: 500, wordWrap: "break-word" }}>
            TRON (TRC20)
          </h3>
        </div>
        <div>
          <p>Wallet Address</p>
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 500,
                flex: 1,
                width: "100%",
                wordWrap: "break-word",
              }}
            >
              {walletId}
            </h3>
            <div>
              <CopyToClipboard
                text={walletId}
                onCopy={() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 3000);
                }}
              >
                <Icon
                  style={{ width: 25, height: 25, marginTop: -10 }}
                  icon="bx:copy"
                />
              </CopyToClipboard>
            </div>
          </div>
          {copied && <Alert severity="success">Copied to clipboard!</Alert>}
        </div>
        <Formik
          initialValues={{ amount: "" }}
          onSubmit={(values, actions) => {
            const person = values;
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <div style={{ position: "relative" }}>
              <UploadField
                onChange={(e) => {
                  setImages([...e.target.files]);
                  if (images.length < 1) return;
                  const newImageUrls = [];
                  images.forEach((image) =>
                    newImageUrls.push(URL.createObjectURL(image))
                  );
                  setImageURLs(newImageUrls);
                }}
                type="file"
                multiple
                accept="image/*"
              />
              <svg
                style={{ position: "absolute", left: 100, top: 50 }}
                width="53"
                height="43"
                viewBox="0 0 53 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.5 5.75H26.5L22.7987 2.04875C21.8013 1.05125 20.4625 0.5 19.0713 0.5H5.5C2.6125 0.5 0.27625 2.8625 0.27625 5.75L0.25 37.25C0.25 40.1375 2.6125 42.5 5.5 42.5H47.5C50.3875 42.5 52.75 40.1375 52.75 37.25V11C52.75 8.1125 50.3875 5.75 47.5 5.75ZM29.125 24.125V32C29.125 33.4437 27.9438 34.625 26.5 34.625C25.0562 34.625 23.875 33.4437 23.875 32V24.125H19.1763C17.995 24.125 17.4175 22.7075 18.2575 21.8937L25.6075 14.57C26.1325 14.045 26.9462 14.0712 27.4713 14.57L34.795 21.8937C35.5825 22.7075 35.005 24.125 33.85 24.125H29.125Z"
                  fill="#219653"
                />
              </svg>
              {imageURLs.map((imageSrc) => {
                console.log(imageSrc);
                return (
                  <img
                    key={imageSrc}
                    src={imageSrc}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 20,
                      marginTop: 8,
                      marginBottom: 8,
                      opacity: 0.7,
                    }}
                  />
                );
              })}
              <p style={{ textAlign: "center" }}>
                Upload a screenshot of deposit above
              </p>
              <Input
                formikProps={formikProps}
                formikKey="amount"
                placeholder="Amount"
                keyboardType="numeric"
                value={formikProps.values.amount}
              />
              <SecondaryBtn
                onClick={() => {
                  console.log(images, imageURLs);
                }}
              >
               <p>Done</p>
              </SecondaryBtn>
            </div>
          )}
        </Formik>
      </Container>
    </div>
  );
};

const styles = {
  qrStyle: {
    width: "100%",
  },
};

export default Deposit;
