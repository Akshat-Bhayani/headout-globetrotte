import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ModalComponent = ({
  open,
  onClose,
  confirmText = "Confirm",
  inviteLink,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink)
      .then(() => alert('Copied to clipboard!'))
      .catch(() => alert('Failed to copy!'));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={styles.modalBox}>
        <Typography id="modal-title" variant="h6" component="h2">
          {'Invite a friend'}
        </Typography>

        <Box sx={styles.content}>
          <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
            {inviteLink || 'Invalid invite link'}
          </Typography>
        </Box>

        <Box sx={styles.actions}>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={copyToClipboard} variant="contained" sx={{ ml: 2 }}>
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
  content: {
    my: 2,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    mt: 3,
  },
};

export default ModalComponent;
