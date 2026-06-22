import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";
import { useEffect } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from "@mui/material";

export default function Water() {

  const [open, setOpen] = useState(false);

  const [counter, setCounter] = useState(1);

  const [todayWater, setTodayWater] = useState(0);

  const percentage = (todayWater / 20) * 100;
  const loadTodayWater = async () => {

  try {

    const res = await API.get("/water/today");

    setTodayWater(res.data.glasses);

  } catch (error) {

    console.error(error);

  }

};
useEffect(() => {

  loadTodayWater();

}, []);



  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
        }}
      >

        <h2>💧make sure to hydrate yourself!!!</h2>

        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 15,
            borderRadius: 10,
            marginTop: 3,
            marginBottom: 3,
          }}
        />

        <h3>
          {todayWater} / 20 glasses - 4L daily is healthy for you
        </h3>

        <p>
          you drank {todayWater} glasses of water today! 💙
        </p>

        <Button
          variant="contained"
          onClick={() => setOpen(true)}
        >
          i drank water just now
        </Button>

        <hr
          style={{
            marginTop: "30px",
            marginBottom: "30px",
          }}
        />

        <h2>daily hydration history:</h2>

        <p>
          no logs yet, come back tomorrow to check! this updates daily🥤
        </p>

      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >

        <DialogTitle>

          how many glasses?

        </DialogTitle>

        <DialogContent>

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >

            <Button
              variant="outlined"
              onClick={() =>
                setCounter(
                  Math.max(1, counter - 1)
                )
              }
            >
              -
            </Button>

            <h2>{counter}</h2>

            <Button
              variant="outlined"
              onClick={() =>
                setCounter(counter + 1)
              }
            >
              +
            </Button>

          </div>

          <p
            style={{
              textAlign: "center",
            }}
          >
            1 glass ≈ 200 ml
          </p>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>

          <Button
            variant="contained"
            onClick={async () => {

  await API.post("/water/add", {
    glasses: counter
  });

  await loadTodayWater();

  setCounter(1);

  setOpen(false);

}}
          >
            save 💙
          </Button>

        </DialogActions>

      </Dialog>
    </>
  );
}