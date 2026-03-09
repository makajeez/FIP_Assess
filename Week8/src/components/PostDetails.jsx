import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar, Chip, Typography, IconButton,
  Tooltip, Divider, Button
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { usePost } from "../context/PostContext";

export function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedViewPost, setSelectedViewPost, postData, openModal } = usePost();

  // Fallback — if user lands directly on the URL (e.g. refreshed the page),
  // selectedViewPost will be null. We recover it from postData in context
  // without making a new API request.
  useEffect(() => {
    if (!selectedViewPost && postData.length > 0) {
      const found = postData.find((p) => p.id === id);
      if (found) setSelectedViewPost(found);
    }
  }, [id, postData, selectedViewPost, setSelectedViewPost]);

  // If we still have no post (e.g. direct URL on a page not yet loaded),
  // show a graceful fallback rather than crashing
  if (!selectedViewPost) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center gap-4">
        <Typography color="text.secondary">Post not found or still loading.</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          variant="outlined"
          color="primary"
        >
          Back to posts
        </Button>
      </div>
    );
  }

  const post = selectedViewPost;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto 2xl:px-40 xl:px-20 px-8 py-12 max-w-4xl">

        {/* ── Back button ── */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          color="primary"
          className="mb-8"
          sx={{ mb: 4 }}
        >
          Back to posts
        </Button>

        {/* ── Hero image ── */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
          <img
            src={post.image}
            alt="Post cover"
            className="w-full object-cover"
            style={{ maxHeight: 480 }}
          />
          {/* Likes badge on the image */}
          <div className="absolute bottom-4 left-6">
            <Chip
              icon={<ThumbUpIcon />}
              label={`${post.likes ?? 0} likes`}
              color="primary"
              sx={{ fontWeight: 700, fontSize: "0.85rem", px: 1 }}
            />
          </div>
        </div>

        {/* ── Author row + actions ── */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Avatar
              src={post.owner.picture}
              alt={`${post.owner.firstName}'s avatar`}
              sx={{ width: 56, height: 56 }}
            />
            <div>
              <Typography variant="subtitle1" fontWeight={600}>
                {post.owner.firstName} {post.owner.lastName}
              </Typography>
              <div className="flex items-center gap-1">
                <CalendarTodayIcon sx={{ fontSize: 14 }} color="disabled" />
                <Typography variant="caption" color="text.secondary">
                  {new Date(post.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </div>
            </div>
          </div>

          {/* Edit + Delete actions */}
          <div className="flex items-center gap-1">
            <Tooltip title="Edit post">
              <IconButton
                color="primary"
                onClick={() => openModal("edit", post)}
                aria-label="Edit post"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete post">
              <IconButton
                color="error"
                onClick={() => {
                  openModal("delete", post);
                  navigate("/"); // go back to list after delete is confirmed
                }}
                aria-label="Delete post"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <Divider sx={{ mb: 4 }} />

        {/* ── Post body ── */}
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ lineHeight: 1.9, fontSize: "1.05rem", mb: 4 }}
        >
          {post.text}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <Chip
              key={`${tag}-${index}`}
              label={tag}
              variant="outlined"
              color="primary"
              size="small"
            />
          ))}
        </div>

      </div>
    </div>
  );
}
