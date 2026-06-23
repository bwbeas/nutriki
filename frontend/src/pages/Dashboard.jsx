import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

import {
Dialog,
DialogTitle,
DialogContent,
DialogActions,
TextField,
Button,
Paper
} from "@mui/material";

import seed from "../assets/plants/seed.png";
import sapling from "../assets/plants/sapling.png";
import plantImg from "../assets/plants/plant.png";
import bigplant from "../assets/plants/bigplant.png";
import tree from "../assets/plants/tree.png";

export default function Dashboard() {

const [plant, setPlant] = useState(null);

const [open, setOpen] = useState(false);

const [plantName, setPlantName] =
useState("");

const loadPlant = async () => {

try {

  const res = await API.get("/plant/");

  setPlant(res.data);

}
catch (error) {

  console.error(error);

}

};

const createPlant = async () => {

try {

  await API.post("/plant/", {

    plant_name: plantName

  });

  setPlantName("");

  setOpen(false);

  loadPlant();

}
catch (error) {

  console.error(error);

}


};

let ageDays = 0;

let plantImage = seed;

let stage = "Seed";

if (plant) {

const createdDate =
  new Date(plant.created_at);

ageDays = Math.floor(

  (
    new Date() - createdDate
  )

  /

  (1000 * 60 * 60 * 24)

);

if (ageDays >= 90) {

  plantImage = tree;
  stage = "Tree";

}

else if (ageDays >= 45) {

  plantImage = bigplant;
  stage = "Growing Plant";

}

else if (ageDays >= 21) {

  plantImage = plantImg;
  stage = "Plant";

}

else if (ageDays >= 7) {

  plantImage = sapling;
  stage = "Sapling";

}

else {

  plantImage = seed;
  stage = "Seed";

}

}

//affirmations
const affirmations = [
  "I am constantly growing, evolving, and improving.",
  "I am creating the life I've always dreamed of.",
  "I give myself permission to feel my way without judgment.",
  "I nourish my soul, spirit, and body because I deserve self-care.",
  "I contribute beautiful things to this world, even if they are small.",
  "Consistency matters more than perfection.",
  "I deserve to prioritize myself over anyone else.",
  "Growth takes time, and that's okay.",
  "I choose to think positively about what's bothering me.",
  "I am deeply in love with and accept all of me.",
  "I love myself; I love my body; I love my mind; I love who I am.",
  "I am surrounded by healing energy.",
  "The future I want is manifesting right now.",
  "My life brings me endless opportunities and possibilities.",
  "It's okay to not feel okay all the time.",
"My worth is not determined by external validation.  I get to remind myself every single day that I was born worthy."
];




const twelveHourBlock = Math.floor(

Date.now()

/

(1000 * 60 * 60 * 12)


);

const affirmation =

affirmations[

  twelveHourBlock %

  affirmations.length

];

const [nickname, setNickname] =
  useState("");

  const loadUser = async () => {

  try {

    const res = await API.get(
      "/auth/me"
    );

    setNickname(
      res.data.nickname
    );

  }

  catch(error){

    console.error(error);

  }

};

useEffect(() => {

  loadPlant();

  loadUser();

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

    {

      !plant ? (

        <div>

          <h3>
            🌱 Grow With Nutriki
          </h3>

          <p>
            Would you like to grow a plant
            alongside your wellness journey?
          </p>

          <button
            onClick={() =>
              setOpen(true)
            }
          >
            Yes, let's grow together 🌷
          </button>

        </div>

      )

      :

      (

        <>

          <h1>
  hello, {nickname} 🌷
</h1>

<p>
  let's take care of ourselves today!!
</p>

          <Paper
            sx={{
              padding: 3,
              borderRadius: 4,
              marginBottom: 3
            }}
          >

            <h3>
              ✨ repeat after me ✨
            </h3>

            <p>
              "{affirmation}"
            </p>

          </Paper>

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.05)"
            }}
          >

            <h2>
              🪴 {plant.plant_name} 💝
            </h2>

            <img
              src={plantImage}
              alt="plant"
              style={{
                width: "250px"
              }}
            />

            <p>
              🌱 growing with you for
              {" "}
              {ageDays}
              {" "}
              days
            </p>

            <p>
              🌿 stage:
              {" "}
              {stage}
            </p>

            <p
              style={{
                color: "#666",
                fontStyle: "italic"
              }}
            >
              This plant grows as your
              wellness journey continues 🌷
            </p>

          </div>

        </>

      )

    }

  </div>

  <Dialog
    open={open}
    onClose={() => setOpen(false)}
  >

    <DialogTitle>

      name your plant 🌱

    </DialogTitle>

    <DialogContent>

      <TextField
        fullWidth
        label="plant name"
        value={plantName}
        onChange={(e) =>
          setPlantName(
            e.target.value
          )
        }
      />

    </DialogContent>

    <DialogActions>

      <Button
        onClick={() =>
          setOpen(false)
        }
      >
        cancel
      </Button>

      <Button
        variant="contained"
        onClick={createPlant}
      >
        start growing 🌷
      </Button>

    </DialogActions>

  </Dialog>

</>


);

}
