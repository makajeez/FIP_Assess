// src/components/modals/AddModal.jsx
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { usePost } from "../../context/PostContext";
import { ImageGallery } from "../ImageGallery";

export function AddModal() {
  const { modalState, closeModal, addPost, selectedImage, setSelectedImage } = usePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addPost({ text: formData.get("text"), image: selectedImage });
  };

  return (
    <Dialog
      open={modalState.add}
      onClose={() => closeModal("add")}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="flex items-center justify-between">
        Create New Post
        <IconButton size="small" onClick={() => closeModal("add")} aria-label="Close">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent className="flex flex-col gap-4">

          <TextField
            name="text"
            label="Post Text"
            multiline
            rows={4}
            fullWidth
            placeholder="Write your post here..."
            required
          />

          <TextField
            label="Selected Image"
            value={selectedImage}
            onChange={(e) => setSelectedImage(e.target.value)}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
            placeholder="Click an image below to select"
          />

          <ImageGallery onSelect={setSelectedImage} selectedImage={selectedImage} />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => closeModal("add")} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disableElevation>
            Add Post
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}