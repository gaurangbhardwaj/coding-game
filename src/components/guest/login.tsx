import React, { useState } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import UnderDevModal from "../shared/underDevModal";
import { styled } from "@mui/system";

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
  const [openModal, setOpenModal] = useState(false);

  const handleLogin = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <StyledBox>
        <StyledPaper elevation={3}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              style={{ marginTop: 10 }}
            >
              Login
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
