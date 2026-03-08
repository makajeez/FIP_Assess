// src/components/modals/EditModal.jsx
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { usePost } from "../../context/PostContext";
import { ImageGallery } from "../ImageGallery";

export function EditModal() {
  const { modalState, closeModal, editPost, selectedPost, selectedImage, setSelectedImage } = usePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    editPost({ text: formData.get("text"), image: selectedImage });
  };

  return (
    <Dialog
      open={modalState.edit}
      onClose={() => closeModal("edit")}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="flex items-center justify-between">
        Edit Post
        <IconButton size="small" onClick={() => closeModal("edit")} aria-label="Close">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form key={selectedPost?.id} onSubmit={handleSubmit}>
        <DialogContent className="flex flex-col gap-4">

          <TextField
            name="text"
            label="Post Text"
            multiline
            rows={4}
            fullWidth
            defaultValue={selectedPost?.text || ""}
            placeholder="Edit post text"
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
          <Button onClick={() => closeModal("edit")} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disableElevation>
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}