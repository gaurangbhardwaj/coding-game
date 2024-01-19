import { Button, Typography, Modal, Box } from "@mui/material";

const UnderDevModal = ({
  openModal,
  handleCloseModal,
}: {
  openModal: boolean;
  handleCloseModal: VoidFunction;
}) => {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div
        style={{
          margin: "20px",
          padding: "20px",
          background: "#fff",
          borderRadius: "5px",
          maxWidth: "500px",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Under Development
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          This feature is currently under development. Stay tuned!
        </Typography>
        <Box textAlign="center">
          <Button variant="contained" onClick={handleCloseModal}>
            Close
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default UnderDevModal;
