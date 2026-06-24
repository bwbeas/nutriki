import { useNavigate } from "react-router-dom";
import { Paper, Button,TextField } from "@mui/material";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram, FaRegHeart } from 'react-icons/fa'; 
import { useState } from "react";
import API from "../api";
import "./theme.css";

export default function Home() {

  const navigate = useNavigate();
  const [nickname, setNickname] =
  useState("");

const [email, setEmail] =
  useState("");

const [message, setMessage] =
  useState("");

const [success, setSuccess] =
  useState("");

  const sendMessage = async () => {

  try {

    await API.post(
      "/contact/",
      {
        nickname,
        email,
        message
      }
    );

    setSuccess(
      "message sent successfully🌷"
    );

    setNickname("");
    setEmail("");
    setMessage("");

  }

  catch (error) {

    console.error(error);

    setSuccess(
      "something went wrong😭"
    );

  }

};

  return (

    <div
      className="nk-page-fade nk-home-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >

      <span style={{ fontSize: "2.6rem", marginBottom: "-10px" }}>🌷🪴🌼</span>

      <h1
        style={{
          fontSize: "4rem",
          fontFamily: "'Fraunces', Georgia, serif",
          color: "#5c4a42",
          fontWeight: 500,
          margin: "10px 0 6px 0"
        }}
        className="nk-home-title"
      >
        nutriki 🌷
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "500px",
          color: "#8a7468",
          fontSize: "1.05rem"
        }}
      >
        a gentle companion for your
        wellness journey.

        track nutrition, hydration,
        moods and cycle health
        one day at a time.
      </p>

      <Button
        variant="contained"
        onClick={() =>
          navigate("/login")
        }
        sx={{ mt: 1 }}
      >
        get started
      </Button>
      <Paper
  className="nk-card-cream nk-home-card"
  sx={{
    p: 3,
    mt: 5,
    width: "350px",
    borderRadius: 4
  }}
>

  <h3 style={{ textAlign: "center" }}>
  💗reach out to the creator for feedback, issues or just a hi?💗 
  </h3>
<div style={{ display: "flex", gap: "16px", justifyContent: "center", margin: "8px 0 18px 0" }}>
<a
  href="https://www.linkedin.com/in/beas-jana/"
  target="_blank"
  style={{ color: "#e25b96" }}
>
  <FaLinkedin
    size={25}
  />
</a>
<a
  href="https://www.instagram.com/nakaharasgloves"
  target="_blank"
  style={{ color: "#e25b96" }}
>
  <FaInstagram
    size={25}
  />
</a>
</div>


<TextField
  fullWidth
  label="ur nickname"
  value={nickname}
  onChange={(e) =>
    setNickname(
      e.target.value
    )
  }
  sx={{ mb: 2 }}
/>
<TextField
  fullWidth
  label="ur email(optional)"
  value={email}
  onChange={(e) =>
    setEmail(
      e.target.value
    )
  }
  sx={{ mb: 2 }}
/>

<TextField
  fullWidth
  multiline
  rows={2}
  label="what do u wanna tell me?🪷"
  value={message}
  onChange={(e) =>
    setMessage(
      e.target.value
    )
  }
  sx={{ mb: 2 }}
/>

<div style={{ textAlign: "center" }}>
<Button
  variant="contained"
  onClick={sendMessage}
>
  Send🌷
</Button>
</div>
{
  success && (

    <p
      style={{
        marginTop: "14px",
        textAlign: "center",
        color: "#e25b96",
        fontWeight: 600
      }}
    >
      {success}
    </p>

  )
}

<hr className="nk-stitch-divider" style={{ margin: "20px 0 10px 0" }} />

  <p style={{ textAlign: "center", color: "#8a7468", fontSize: "0.9rem" }}>
    made with love by
    beas🐝 
  </p>
  

</Paper>

    </div>

  );

}