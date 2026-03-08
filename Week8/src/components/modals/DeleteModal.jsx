// src/components/modals/DeleteModal.jsx
import {
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Button
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { usePost } from "../../context/PostContext";

export function DeleteModal() {
  const { modalState, closeModal, deletePost, selectedPost } = usePost();

  return (
    <Dialog
      open={modalState.delete}
      onClose={() => closeModal("delete")}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle className="flex items-center gap-2">
        <WarningAmberIcon color="error" />
        Delete Post
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this post?
        </DialogContentText>
        {selectedPost && (
          <DialogContentText variant="body2" className="mt-2 italic truncate" color="text.secondary">
            "{selectedPost.text?.slice(0, 60)}..."
          </DialogContentText>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => closeModal("delete")} color="inherit">
          Cancel
        </Button>
        <Button onClick={deletePost} color="error" variant="contained" disableElevation>
          Yes, delete it
        </Button>
      </DialogActions>
    </Dialog>
  );
}