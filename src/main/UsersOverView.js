import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  Container,
} from "../styles/styledUtils";
import { useNavigate } from "react-router-dom";
import { updateUsersList } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios"
import { baseUrl, paths } from "../config";

const UsersOverView = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const {token, userList} = useSelector(state=>state.user);
  const dispatch = useDispatch()
  const fetchUsers = async () => {
    try{

      const response = await axios.get(`${baseUrl}/${paths.users}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(response.status === 200){
        dispatch(updateUsersList(response.data))
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  const getDate = (stamp) => {
    let date = new Date(stamp)
    let monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    
    let month = monthList[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear()
    return `${month} ${day} ${year}`
  }
  
  useEffect(()=>{
    fetchUsers()
  },[])

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
          fontWeight: 500,
          fontSize: 22,
          paddingLeft: 12,
        }}
      >
        <Icon
          icon="akar-icons:arrow-back"
          style={{ width: 30, height: 30, marginTop: -8, marginRight: 10 }}
          onClick={() => navigate(-1)}
        />{" "}
        Users OverView
      </div>
      <Container>
        <div>
          <input
            placeholder="Search username"
            style={{
              outline: "none",
              padding: 10,
              borderRadius: 10
            }}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            name="search"
            type="text"
          />
        </div>
        <TableContainer>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.cellStyle}>Username</TableCell>
                <TableCell style={styles.cellStyle}>Email</TableCell>
                <TableCell style={styles.cellStyle}>Creation date</TableCell>
          
              </TableRow>
            </TableHead>
            <TableBody>
              {userList
                .filter((row) => row.username.toLowerCase().search(query) != -1)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={styles.cellStyle}
                      component="th"
                      scope="row"
                    >
                      {row.username}
                    </TableCell>
                    <TableCell style={styles.cellStyle} align="left">
                      {row.email}
                    </TableCell>
                    <TableCell style={styles.cellStyle} align="left">
                      {getDate(row?.profile?.date_joined)}
                    </TableCell>
                    
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

const styles = {
  textStyle: {
    fontWeight: "bold",
  },
  linkStyle: {
    textDecoration: "none",
    color: "#000",
  },
};

export default UsersOverView;
