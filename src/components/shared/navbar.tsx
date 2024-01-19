// NavigationBar.tsx
import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import WhaleLogo from "../../assets/images/whale-logo.png";

const NavigationBar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ background: "#000000" }}>
      <Toolbar
        style={{ justifyContent: "space-between", alignContent: "center" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Link to="/">
            <img
              src={WhaleLogo}
              alt="Logo"
              style={{ width: "60px", height: "45px", marginRight: "16px" }}
            />
          </Link>
          <Button color="inherit" component={Link} to="/aboutus">
            About Us
          </Button>
          <Button color="inherit" component={Link} to="/codingchallenge">
            Coding Challenge
          </Button>
          <Button color="inherit" component={Link} to="/leaderboard">
            Leaderboard
          </Button>
        </div>
        <div>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
