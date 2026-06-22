import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";

import EmojiPicker from "emoji-picker-react";

export default function Food() {

  const [open, setOpen] = useState(false);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [meal, setMeal] = useState({

    meal_type: "",

    emoji: "🌯",

    food_name: "",

    fast_food: "No",

    calories: ""

  });
const [meals, setMeals] = useState([]);

const loadMeals = async () => {

    try {

        const res = await API.get("/meals/");

        setMeals(res.data);

    } catch (error) {

        console.error(error);

    }

};
useEffect(() => {

    loadMeals();

}, []);
  const handleChange = (e) => {

    setMeal({
      ...meal,
      [e.target.name]: e.target.value,
    });

  };

  const handleEmojiClick = (emojiData) => {

    setMeal({
      ...meal,
      emoji: emojiData.emoji,
    });

    setShowEmojiPicker(false);

  };

  const handleSave = async () => {

    await API.post("/meals/", {
        meal_type: meal.meal_type,
        food_name: meal.food_name,
        emoji: meal.emoji,
        fast_food: meal.fast_food === "Yes",
        calories: meal.calories
    });

    await loadMeals();

    setMeal({
        meal_type: "",
        emoji: "🌯",
        food_name: "",
        fast_food: "No",
        calories: ""
    });

    setShowEmojiPicker(false);
    setOpen(false);

};

  return (

    <>
      <Navbar />

      <div style={{ maxWidth: "900px", margin: "40px auto" }}>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>hello, did u eat today?</h2>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
          >
            + log a meal
          </Button>
        </div>

        <hr />

        <h3>YOUR RECORDED MEAL HISTORY: </h3>
        <h4>🫸be careful, you cannot delete these entries so you dont ever feel guilty for eating!🌻🤗</h4>

        {
  meals.length === 0 ? (

    <p>no meals yet? make sure to feed yourself 💓</p>

  ) : (

    meals.map((meal, index) => {

      const date = new Date(meal.created_at);

      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return (

        <div
          key={index}
          style={{
            background: "#ffffff",
            padding: "18px",
            borderRadius: "15px",
            marginBottom: "15px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >

          <h3>

            {meal.emoji} I ate {meal.food_name} for {meal.meal_type}

          </h3>

          <p>

            🕒at {formattedTime} • {formattedDate}

          </p>

          <p>

            fast food? {meal.fast_food ? "yes" : "no"}

          </p>

          {

            meal.calories && (

              <p>

                🔥 {meal.calories} cal

              </p>

            )

          }

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
        maxWidth="sm"
      >

        <DialogTitle>

          logging a new meal

        </DialogTitle>

        <DialogContent>

          <TextField
            select
            label="what time are you eating?"
            name="meal_type"
            value={meal.meal_type}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Breakfast">breakfast🥞</MenuItem>
            <MenuItem value="Lunch">lunch🥗</MenuItem>
            <MenuItem value="Dinner">dinner🍱</MenuItem>
            <MenuItem value="Snack">snack/fruit🍎</MenuItem>
            <MenuItem value="Midnight Munch">midnight munch 🌙</MenuItem>
          </TextField>

          <TextField
  label="what did you eat?"
  name="food_name"
  value={meal.food_name}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "15px",
    marginBottom: "15px",
  }}
>
  <span style={{ fontSize: "30px" }}>
    {meal.emoji}
  </span>

  <Button
    variant="outlined"
    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
  >
    choose an emoji?
  </Button>
</div>

{showEmojiPicker && (
  <div style={{ marginBottom: "15px" }}>
    <EmojiPicker
      onEmojiClick={handleEmojiClick}
      width="100%"
    />
  </div>
)}


          <FormLabel>

            does this fall under fast food?

          </FormLabel>

          <RadioGroup
            row
            name="fast_food"
            value={meal.fast_food}
            onChange={handleChange}
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

          <TextField
  label="estimated calories (totally optional dw)"
  name="calories"
  placeholder="e.g. 450"
  value={meal.calories}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            save it!
          </Button>

        </DialogActions>

      </Dialog>

    </>
  );

}