import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

import WhaleLogo from "../../assets/images/whale-logo.png";
import InterviewImg from "../../assets/images/interview.png";

const LandingPage: React.FC = () => {
  return (
    <>
      <Container style={{ textAlign: "center", marginTop: "50px" }}>
        <img
          src={WhaleLogo}
          alt="Landing Page"
          style={{ width: "100%", maxWidth: "200px", margin: "20px auto" }}
        />
        <Typography variant="h2" gutterBottom>
          Welcome to Coding Whale
        </Typography>
        <Typography variant="body1" paragraph>
          Explore coding challenges, compete with others, and enhance your
          programming skills.
        </Typography>
        <Typography variant="body1" paragraph>
          Get ready to take on exciting challenges and climb the leaderboard.
          Whether you are a beginner or an experienced coder, there's something
          for everyone!
        </Typography>
        <Box
          style={{
            marginBottom: 80,
            gap: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to="/codingchallenge">
            <Button variant="contained" color="primary">
              Explore Challenges
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="contained" color="primary">
              Sign up now
            </Button>
          </Link>
        </Box>
      </Container>
      <Container style={{ textAlign: "center" }}>
        <Typography
          color="red"
          variant="h4"
          gutterBottom
          style={{ textDecoration: "striked" }}
        >
          <s> It’s not a pipeline problem.</s>
        </Typography>
        <Typography color="green" variant="h4" gutterBottom>
          It’s a spotlight problem.
        </Typography>
        <Typography variant="body1">
          Tech hiring needs a reset. From prepping for jobs and practicing
          coding to running a world-class technical interview, give developers
          the tools they need to showcase their skills, passion, and potential.{" "}
        </Typography>
        <img
          src={InterviewImg}
          alt="InterviewImg"
          style={{ width: "100%", maxWidth: "1000px", margin: "80px auto" }}
        />
      </Container>
    </>
  );
};

export default LandingPage;
