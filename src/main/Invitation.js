import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Container, SecondaryBtn } from "../styles/styledUtils";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { paths, baseUrl } from "../config";
import { updateInvites } from "../features/user/userSlice";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const Invitation = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { userProfile, token, invites } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchUserInvites = async (token) => {
    try {
      console.log("no user");
      const response = await axios.get(
        `${baseUrl}/${paths.invitedUsers}/${userProfile?.profile?.slug}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        dispatch(updateInvites(response.data));
        return;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchUserInvites(token);
  }, [token]);

  return (
    <Container>
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
        <h2 style={{ marginLeft: 10 }}>Invite your friends</h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {copied && <Alert severity="success">Copied to clipboard!</Alert>}
        <h3>Invitation code:</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ fontWeight: "bold" }}>
            {userProfile?.profile?.user_referral_code}
          </h2>
          <div>
            <CopyToClipboard
              text={userProfile?.profile?.user_referral_code}
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
        <p style={{ textAlign: "center" }}>
          Copy your invitation code and share with friends
        </p>
      </div>
      <hr />
      <div>
        <h2>Commission rules</h2>
        <p style={{fontSize: 13}}>For every bet placed by a friend after registering, you will recive a corresponding percentage commission.</p>
      </div>
      <h3 style={{textAlign: "center"}}>Referral summary</h3>
      <TableContainer>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Commission rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invites?.map((row) => (
              <TableRow
                key={row.id}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">1%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CopyToClipboard
        text={`${document.location.origin}/signup/:${userProfile?.profile?.user_referral_code}`}
        onCopy={() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        }}
      >
        <SecondaryBtn>
          <p style={{ fontSize: 12, paddingRight: 4 }}>
            Click to copy your invitation link
          </p>
          <Icon icon="ci:share" style={{ color: "#fff", marginTop: -15 }} />
        </SecondaryBtn>
      </CopyToClipboard>
    </Container>
  );
};

export default Invitation;
