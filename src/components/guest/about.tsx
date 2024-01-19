import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  Paper,
} from "@mui/material";
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

const AboutUs: React.FC = () => {
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSendQuery = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const isFormValid = query !== "";

  return (
    <>
      <StyledBox>
        <StyledPaper elevation={0}>
          <Typography variant="h4" align="center" gutterBottom>
            {"Let’s get in touch."}
          </Typography>

          <Typography>
            Welcome to our platform! Talk to a member of our sales team to
            schedule a demo, pick the best plan for your team, or learn more
            about everything Coding Whale has to offer.
          </Typography>
          <h3>Contact Us</h3>
          <TextField
            label="Your Query"
            style={{ width: "100%" }}
            multiline
            rows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div style={{ paddingTop: 20 }}>
            <Button
              variant="contained"
              onClick={handleSendQuery}
              disabled={!isFormValid}
            >
              Send
            </Button>
          </div>
        </StyledPaper>
      </StyledBox>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            margin: "20px",
            padding: "20px",
            background: "#fff",
            borderRadius: "5px",
          }}
        >
          <h3>Query Sent</h3>
          <p>
            Your query has been sent successfully. We'll get back to you soon!
          </p>
          <Button variant="contained" onClick={handleCloseModal}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AboutUs;
