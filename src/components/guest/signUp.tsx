import React, { useState } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import UnderDevModal from "../shared/underDevModal";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
});

const StyledPaper = styled(Paper)({
  padding: "16px",
  maxWidth: "400px",
});

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleLogin = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const isFormValid =
    email !== "" && password !== "" && password === reEnterPassword;

  return (
    <>
      <StyledBox>
        <StyledPaper elevation={3}>
          <Typography variant="h5" align="center" gutterBottom>
            Sign up
          </Typography>
          <form>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Re-enter Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              disabled={!isFormValid}
              style={{ marginTop: 10 }}
            >
              Sign up
            </Button>
          </form>
        </StyledPaper>
      </StyledBox>
      <UnderDevModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default Login;
