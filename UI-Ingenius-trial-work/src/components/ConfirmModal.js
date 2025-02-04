import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ConfirmModal({
  open,
  handleClose,
  handleOpen,
  handleSubscription,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Subscription
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You have selected the plan. Are you sure you want to proceed?
          </Typography>
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              sx={{ mr: 2, minWidth: 120 }}
            >
              No, Keep Subscription
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubscription}
              sx={{ mr: 2, minWidth: 120 }}
            >
              Yes, Confirm Subscription
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
