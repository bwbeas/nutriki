
import Navbar from "../components/Navbar";
import API from "../api";
import { useState, useEffect } from "react";

import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper
} from "@mui/material";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Cycle() {

  const [hysterectomy, setHysterectomy] = useState("No");

  const [periodStart, setPeriodStart] = useState(dayjs());
  const today = dayjs();

const cycleDay =
  today.diff(periodStart, "day") + 1;
let phase = "";

if (cycleDay <= 5) {
  phase = "🩸MENSTRUAL PHASE🩸";
}
else if (cycleDay <= 13) {
  phase = "🌱FOLLICULAR PHASE🌱";
}
else if (cycleDay === 14) {
  phase = "🌼OVULATION🌼";
}
else {
  phase = "🌙LUTEAL PHASE🌙";
}

const nextPeriod =
  periodStart.add(28, "day");

const loadCycle = async () => {

  try {

    const res = await API.get("/cycle/");

    console.log("LOADED:");
    console.log(res.data);

    if (res.data) {

      setHysterectomy(
        res.data.hysterectomy
          ? "Yes"
          : "No"
      );

      if (res.data.period_start) {

        setPeriodStart(
          dayjs(res.data.period_start)
        );

      }

    }

  } catch (error) {

    console.error(error);

  }

};
useEffect(() => {

  loadCycle();

}, []);

const saveCycle = async (
  newHysterectomy,
  newPeriodStart
) => {

  console.log("SAVE STARTED");

  try {

    const res = await API.post("/cycle/", {

      hysterectomy:
        newHysterectomy === "Yes",

      period_start:
        newPeriodStart.toISOString()

    });

    console.log("SAVE SUCCESS");
    console.log(res.data);

  } catch (error) {

    console.error("SAVE FAILED");
    console.error(error);

  }

};


  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "40px auto"
        }}
      >

        <h2>🌸your cycle companion🩸</h2>

        <p>
          💌every body has its own rhythm.
          <br />
          would you mind telling us when your most recent period began?
        </p>

        <hr />

        <h4>
          🫂a quick question before we begin: have you ever undergone a hysterectomy?
        </h4>

        <RadioGroup
          row
          value={hysterectomy}
          onChange={(e) => {

  const value = e.target.value;

  setHysterectomy(value);

  saveCycle(
    value,
    periodStart
  );

}}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio />}
            label="Yes"
          />

          <FormControlLabel
            value="No"
            control={<Radio />}
            label="No"
          />
        </RadioGroup>

        {
          hysterectomy === "Yes" && (

            <Paper
              sx={{
                padding: 3,
                marginTop: 3
              }}
            >
              🌷Thank you for letting us know.
              <br /><br />
              Cycle predictions and period tracking
              have been disabled.
              <br /><br />
              You can re-enable this section at any time.
            </Paper>

          )
        }
        {
  hysterectomy === "No" && (

    <div
      style={{
        display: "flex",
        gap: "30px",
        marginTop: "30px"
      }}
    >

      <Paper
        sx={{
          padding: 2,
          flex: 2
        }}
      >

        <h3>
          🪷track your last cycle date below!
        </h3>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DateCalendar
    value={periodStart}
    onChange={(newValue) => {

  if (!newValue) return;

  setPeriodStart(newValue);

  saveCycle(
    hysterectomy,
    newValue
  );

}}
    disableFuture
  />
</LocalizationProvider>

      </Paper>

      <Paper
        sx={{
          padding: 3,
          flex: 1
        }}
      >

        <h2>
          🌸SUMMARY:
        </h2>

        <p>
  today is day {cycleDay} of your cycle
</p>

<p>
  current phase:
  <br />
  <strong>{phase}</strong>
</p>

<p>
  next predicted period:
  <br />
  {nextPeriod.format("DD MMMM YYYY")}
</p>

<p>
  estimated cycle length:
  <br />
  28 days
</p>

<hr />

<h3>
  🌷gentle reminder
</h3>

<p>
  cycle predictions are estimates
  and may not always match your
  body's natural rhythm.
</p>

      </Paper>

    </div>

  )
}

      </div>
    </>
  );
}