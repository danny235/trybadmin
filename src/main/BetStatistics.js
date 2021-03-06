import React, { useState, useEffect, useReducer } from "react";
import {
  Container,
  OptionCircle,
  CustomColoredBtn,
  CustomModal,
} from "../styles/styledUtils";
import { colors } from "../components/colors";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { useCountdown } from "../hooks/useCountdown";
import {
  updateBetStatsList,
  updateBetStatsListDetail,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl, paths } from "../config";
import { toast } from "react-toastify";

const BetStatistics = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [closeSession, setCloseSession] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false)
  const [betValues, setBetValues] = useState({
    bet_type: "",
    bet_slug: null,
  });
  let FIVE_MINUTES_IN_S = startTime;
  const [stats, setStats] = useState({
    small_win: false,
    big_win: false,
  });
  const { token, betStatsList, betStatsListDetail } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const fetchBetsStats = async () => {
    try {
      const { data, status } = await axios.get(
        `${baseUrl}/${paths.betStats}/${paths.betList}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 200) {
        dispatch(updateBetStatsList(data[data?.length - 1]));
      }
      // console.log(data[data?.length-1])
    } catch (err) {
      console.log(err);
    }
  };
  const fetchBetsStatsDetail = async (slug) => {
    try {
      const { data, status } = await axios.get(
        `${baseUrl}/${paths.totalBets}/${slug}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 200) {
        dispatch(updateBetStatsListDetail(data))
      }
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const createNewSession = async () => {
    setCloseSession(true);
    try {
      const { data, status } = await axios.put(
        `${baseUrl}/${paths.createSession}`,
        {
          session_started: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(data);
      if (status === 200) {
        setCloseSession(false);
        toast.success("New bet session created");
        forceUpdate();
      }
    } catch (err) {
      setCloseSession(false);
      toast.error(err.message);
      console.log(err.message);
    }
  };

  const updateBetsStats = async (stats, slug) => {
    setCloseSession(true);
    try {
      const { data, status } = await axios.patch(
        `${baseUrl}/${paths.betStats}/${paths.betStatsUpdate}/${slug}/`,
        stats,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 200) {
        setOpen(false);
        setCloseSession(false);
        toast.success("Bets compiled");
        
      }
      // console.log(data);
    } catch (err) {
      if (err.message === "Request failed with status code 400") {
        setCloseSession(false);
        setOpen(false);
        return toast.error(err?.response?.data?.detail[0]);
      }
      if (err.message === "Request failed with status code 404") {
        setCloseSession(false);
        setOpen(false);
        return toast.error(err?.response?.data?.detail[0]);
      }
      setCloseSession(false);
      setOpen(false);
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const fetchCurrentSession = async () => {
    try {
      const { data, status } = await axios.get(
        `${baseUrl}/${paths.betSession}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(data, status);
      let time;
      if (status === 200) {
        setBetValues({ ...betValues, bet_slug: data?.current_session_slug });
        setSessionStarted(data?.session_started)
        time = parseFloat(data?.remaining_time);
        setStartTime(time);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBetsStats();
    fetchBetsStatsDetail(betStatsList?.slug);
    fetchCurrentSession();
    
    const interval = setInterval(() => {
      fetchCurrentSession();
      fetchBetsStats();
      fetchBetsStatsDetail(betStatsList?.slug);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    fetchBetsStats();
    fetchBetsStatsDetail(betStatsList?.slug);
    fetchCurrentSession();
  }, [reducerValue]);

  const [minutes, seconds] = useCountdown(FIVE_MINUTES_IN_S);

  const timeLeft = minutes + seconds;
  
  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 40,
        }}
      >
        <Icon
          icon="akar-icons:arrow-back"
          style={{ width: 30, height: 30, marginTop: -15 }}
          onClick={() => navigate(-1)}
        />
        <h2 style={{ marginLeft: 10 }}>Bet statistics</h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <div>
          <OptionCircle color={colors.secondary}>
            <h1>Big</h1>
          </OptionCircle>
          <h2 style={styles.betAmountText}>
            {betStatsListDetail?.total_amount_big}
          </h2>
        </div>
        <h1 style={{ fontSize: 60 }}>-</h1>
        <div>
          <OptionCircle color={colors.red}>
            <h1>Small</h1>
          </OptionCircle>
          <h2 style={styles.betAmountText}>
            {betStatsListDetail?.total_amount_small}
          </h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <p>{`Time remaining: ${minutes}:${seconds}`}</p>
        <CustomColoredBtn
          bgColor={colors.secondary}
          onClick={() => {
            createNewSession();
          }}
          style={{ width: "80%", marginTop: 10 }}
          disabled={closeSession || sessionStarted ? true : false}
        >
          {closeSession ? "Restarting..." : "Restart timer"}
        </CustomColoredBtn>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <h2 style={{ textAlign: "center" }}>Ratio</h2>
        <h3 style={{ textAlign: "center", fontWeight: "400" }}>
          Big : Small = {betStatsListDetail?.total_amount_big} :{" "}
          {betStatsListDetail?.total_amount_small}
        </h3>
        <h2 style={{ textAlign: "center" }}>Choose which to win/loose</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 25,
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <CustomColoredBtn
          bgColor={colors.secondary}
          onClick={() => {
            setStats({ small_win: false, big_win: true });
            setOpen(true);
          }}
        >
          Big
        </CustomColoredBtn>
        <h5>or</h5>
        <CustomColoredBtn
          bgColor={colors.red}
          onClick={() => {
            setStats({ small_win: true, big_win: false });
            setOpen(true);
          }}
        >
          Small
        </CustomColoredBtn>
      </div>
      {timeLeft === "0000" ? (
        <p
          style={{ color: colors.red, fontWeight: "bold", textAlign: "center" }}
        >
          Please compile bets!
        </p>
      ) : null}
      <Dialog fullWidth onBackdropClick={() => setOpen(false)} open={open}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: 200,
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: 10 }}>
            Do you want to continue?
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 25,
              marginBottom: 15,
              alignItems: "center",
            }}
          >
            <CustomColoredBtn
              bgColor={colors.secondary}
              onClick={() => {
                setOpen(true);
                console.log(stats);
                updateBetsStats(stats, betStatsList?.slug);
              }}
              disabled={closeSession}
            >
              Yes
            </CustomColoredBtn>
            <h5>or</h5>
            <CustomColoredBtn
              bgColor={colors.red}
              onClick={() => setOpen(false)}
              disabled={closeSession}
            >
              No
            </CustomColoredBtn>
          </div>
        </div>
      </Dialog>
    </Container>
  );
};

const styles = {
  betAmountText: {
    textAlign: "center",
    fontSize: 18,
  },
};

export default BetStatistics;
