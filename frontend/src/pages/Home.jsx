import { useNavigate } from "react-router-dom";
import { Paper, Button,TextField } from "@mui/material";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram, FaRegHeart } from 'react-icons/fa'; 
import { useState } from "react";
import API from "../api";

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
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff9fc",
        padding: "20px"
      }}
    >

      <h1
        style={{
          fontSize: "4rem"
        }}
      >
        nutriki 🌷
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "500px"
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
      >
        get started
      </Button>
      <Paper
  sx={{
    p: 3,
    mt: 5,
    width: "350px",
    borderRadius: 4
  }}
>

  <h3>
  💗reach out to the creator for feedback, issues or just a hi?💗 
  </h3>
<a
  href="https://www.linkedin.com/in/beas-jana/"
  target="_blank"
>
  <FaLinkedin
    size={25}
  />
</a>
<a
  href="https://www.instagram.com/nakaharasgloves"
  target="_blank"
>
  <FaInstagram
    size={25}
  />
</a>


<TextField
  fullWidth
  label="ur nickname"
  value={nickname}
  onChange={(e) =>
    setNickname(
      e.target.value
    )
  }
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
/>

<Button
  variant="contained"
  onClick={sendMessage}
>
  Send🌷
</Button>
{
  success && (

    <p
      style={{
        marginTop: "10px"
      }}
    >
      {success}
    </p>

  )
}


  <p>
    made with love by
    beas🐝 
  </p>
  

</Paper>

    </div>

  );

}