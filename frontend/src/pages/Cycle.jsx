
import Navbar from "../components/Navbar";
import API from "../api";
import { useState, useEffect } from "react";
import { PickerDay }
from "@mui/x-date-pickers/PickerDay";

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

let nextPeriod =
  periodStart.add(28, "day");

if (
  today.diff(periodStart, "day") > 28
) {

  nextPeriod = today;

}

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

const periodDates = [];

for (let i = 0; i < 5; i++) {

  periodDates.push(
    periodStart.add(i, "day")
  );

}

const ovulationDate =
  periodStart.add(14, "day");

  const predictedDates = [];

for (let i = 0; i < 5; i++) {

  predictedDates.push(
    nextPeriod.add(i, "day")
  );

}

const CustomDay = (props) => {

  const { day, ...other } = props;

  const isPeriodDay =
    periodDates.some(date =>
      date.isSame(day, "day")
    );

  const isPredictedDay =
    predictedDates.some(date =>
      date.isSame(day, "day")
    );

  const isOvulationDay =
    ovulationDate.isSame(day, "day");

  return (

    <PickerDay
      {...other}
      day={day}
      sx={{

        ...(isPeriodDay && {
          backgroundColor: "#fc036f",
          color: "white"
        }),

        ...(isPredictedDay && {
          backgroundColor: "#ff8cbe",
          color: "black"
        }),

        ...(isOvulationDay && {
          backgroundColor: "#33aff2",
          color: "white"
        })

      }}
    />

  );

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
<div style={{ maxWidth: "900px", margin: "40px auto" }}>
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
  
</div>

        

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
  slots={{
    day: CustomDay
  }}
/>

<div
  style={{
    display: "flex",
    gap: "15px",
    marginTop: "15px",
    flexWrap: "wrap"
  }}
>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}
  >
    <div
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: "#fc036f"
      }}
    />
    <span>last/current period🩸</span>
  </div>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}
  >
    <div
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: "#ff8cbe"
      }}
    />
    <span>predicted period⏰</span>
  </div>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}
  >
    <div
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: "#33aff2"
      }}
    />
    <span>ovulation start🌺</span>
  </div>

</div>



</LocalizationProvider>

      </Paper>

      <Paper
        sx={{
          padding: 3,
          flex: 1
        }}
      >

        <h2>
          🌸summary:
        </h2>

        <h3>
  TODAY IS DAY {cycleDay} OF YOUR CYCLE
</h3>

<p>
  current phase:
  <br />
  <strong>{phase}</strong>
</p>

<p>
  next predicted period:
  <br />
  <h3>{nextPeriod.format("DD MMMM YYYY")}</h3>
</p>

<p>
  estimated cycle length:
  <br />
  28 days
</p>
<hr />

<h3>
  🩸 last recorded period
</h3>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "15px"
  }}
>

  {periodDates.map((date) => (

    <div
      key={date.format()}
      style={{
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        background: "#e53935",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {date.date()}
    </div>

  ))}

</div>

<h3>
  🌷 predicted next period
</h3>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "8px"
  }}
>

  {predictedDates.map((date) => (

    <div
      key={date.format()}
      style={{
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        background: "#f8a5c2",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {date.date()}
    </div>

  ))}

</div>


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