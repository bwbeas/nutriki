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


const [dashboardData, setDashboardData] =
  useState(null);

  const loadDashboard = async () => {

  try {

    const res =
      await API.get("/dashboard/");

    setDashboardData(
      res.data
    );

  }

  catch(error){

    console.error(error);

  }

};
useEffect(() => {

  loadPlant();

  loadUser();

  loadDashboard();

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

{
  dashboardData?.food_reminder && (

    <Paper
      sx={{
        p: 3,
        mt: 2,
        mb: 3,
        borderRadius: 4,
        background: "#fff4f4"
      }}
    >

      <h3>
        🍱 gentle check-in
      </h3>

      <p>

        {nickname},

        please try to eat something if
        you haven't already.

        we haven't seen a food log
        for a while and we hope
        you're doing okay. 🌷

      </p>

      <p>

        whatever you're going through,
        take things one step at a time. 💗💗💗

      </p>

    </Paper>

  )
}



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

          {
  dashboardData?.cycle && (

    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 4
      }}
    >

      <h2>
        {dashboardData.cycle.phase}
      </h2>

      <p>
        🪻today is day{" "}
        {dashboardData.cycle.cycle_day}
        {" "}of your cycle!
      </p>

      <p>
        {dashboardData.cycle.phase_message}
      </p>

      <hr />

      <h4>
        🌷gentle suggestions for you:
      </h4>

      <p>
        {dashboardData.cycle.phase_food}
      </p>

    </Paper>

  )
}

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
              🪴watch your {plant.plant_name} grow💞
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

          {
  dashboardData?.last_mood && (

    <Paper
      sx={{
        p: 3,
        mt: 3,
        borderRadius: 4
      }}
    >

      <h3>
        🥹🌻a little note for you:
      </h3>

      <h1>
        {dashboardData?.last_mood}
      </h1>

      <p>
        {dashboardData?.mood_message}
      </p>

      <small>

        based on your latest mood log

      </small>

    </Paper>
    

  )
  
}
<Paper
  sx={{
    p: 3,
    mt: 3,
    borderRadius: 4
  }}
>

  <h3>
    🍱😋your last meal:
  </h3>

  <h2>
    {dashboardData?.last_food}
  </h2>

  <p>
    nom nom.... did you enjoy it?
    remember to nourish yourself today.
    every meal is a small act of self-care.🥙🌷
  </p>

</Paper>
<Paper
  sx={{
    p: 3,
    mt: 3,
    borderRadius: 4
  }}
>

  <h3>
    💧 hydration check-in:
  </h3>

  <h2>
    {dashboardData?.water_glasses}
    {" "}
    glasses of water logged today
  </h2>

  {
    dashboardData?.water_glasses === 0 ? (

      <p>

        🌷😔you haven't logged any water today.

        please remember to stay hydrated.
        even a small glass of water is a lovely
        act of self-care.

      </p>

    ) : (

      <p>

        💙keep taking care of yourself today.
        your body appreciates every sip.🚰💧

      </p>

    )
  }

</Paper>

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
