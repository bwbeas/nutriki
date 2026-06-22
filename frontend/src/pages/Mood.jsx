import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  TextField
} from "@mui/material";

export default function Mood() {
  const [open, setOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [appetite, setAppetite] = useState("");
  const [journal, setJournal] = useState("");
  const reasons = [
    "Partner",
    "Family",
    "Friend / Colleague",
    "Just Myself",
    "My Period",
    "Work / Study",
    "Travel",
    "Sleep",
    "Medications",
    "Exercise"
  ];
  const appetiteOptions = [
    "🥣 not hungry really",
    "🥗 ate because i should",
    "🍱 pretty normal",
    "😋 i'm hungry actually",
    "🥹 i want to EATTTT"
  ];
  const [moodHistory, setMoodHistory] = useState([]);
  const loadMoodHistory = async () => {
  try {
    const res = await API.get("/mood/history");
    setMoodHistory(res.data);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  loadMoodHistory();
}, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h2>💗how are you feeling today? is everything okay?🐣</h2>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
          >
            + log mood
          </Button>
        </div>

        <hr />

        <h3>your mood history:</h3>

        {
  moodHistory.length === 0 ? (

    <p>no mood logs yet🌻</p>

  ) : (

    moodHistory.map((entry) => {

      const date = new Date(entry.created_at);

      return (

        <div
          key={entry.id}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "15px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}
        >

          <h2>
            {entry.mood_emoji}
          </h2>

          <p>
            🥞 {entry.appetite}
          </p>

          <p>
            📌 {entry.reasons}
          </p>

          {entry.journal && (

            <p>
              ✍️ {entry.journal}
            </p>

          )}

          <small>

            {date.toLocaleString()}

          </small>

        </div>

      );

    })

  )
}

      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          it's okay, check in today🫂
        </DialogTitle>

        <DialogContent>

          <h3>how are you feeling?</h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "25px"
            }}
          >
            {["😖", "🙁", "😐", "☺️", "😁"].map((emoji) => (
              <Button
                key={emoji}
                variant={
                  selectedMood === emoji
                    ? "contained"
                    : "outlined"
                }
                onClick={() => setSelectedMood(emoji)}
                sx={{
                  fontSize: "30px",
                  minWidth: "60px"
                }}
              >
                {emoji}
              </Button>
            ))}
          </div>

          <h3>do you wanna log any reasons?</h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "25px"
            }}
          >
            {reasons.map((reason) => (
              <Chip
                key={reason}
                label={reason}
                clickable
                color={
                  selectedReasons.includes(reason)
                    ? "primary"
                    : "default"
                }
                onClick={() => {

                  if (
                    selectedReasons.includes(reason)
                  ) {

                    setSelectedReasons(
                      selectedReasons.filter(
                        r => r !== reason
                      )
                    );

                  } else {

                    setSelectedReasons([
                      ...selectedReasons,
                      reason
                    ]);

                  }

                }}
              />
            ))}
          </div>

          <h3>how would you say ur apetite is rn?</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "25px"
            }}
          >
            {appetiteOptions.map((option) => (
              <Button
                key={option}
                variant={
                  appetite === option
                    ? "contained"
                    : "outlined"
                }
                onClick={() => setAppetite(option)}
              >
                {option}
              </Button>
            ))}
          </div>

          <h3>do u want to reflect?📖</h3>

          <TextField
            multiline
            rows={6}
            fullWidth
            value={journal}
            onChange={(e) =>
              setJournal(e.target.value)
            }
            placeholder="tell me about today..."
          />

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

    try {

      await API.post("/mood/", {
        mood_emoji: selectedMood,
        reasons: selectedReasons,
        appetite: appetite,
        journal: journal
      });

      await loadMoodHistory();

      setSelectedMood("");
      setSelectedReasons([]);
      setAppetite("");
      setJournal("");

      setOpen(false);

    } catch (error) {

      console.error(error);

    }

  }}
>
  save 🌻
</Button>
        </DialogActions>

      </Dialog>
    </>
  );
}