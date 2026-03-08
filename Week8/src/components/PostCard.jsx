// src/components/PostCard.jsx
import {
  Card, CardMedia, CardContent,
  IconButton, Chip, Typography, Avatar, Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { usePost } from "../context/PostContext";

export function PostCard({ post }) {
  const { openModal } = usePost();

  return (
    <Card
      style={{marginBottom:"8px"}}
      elevation={3}
      sx={{
        maxWidth: 384,
        transition: "all 0.3s",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 6 },
      }}
    >
      <CardContent>

        {/* Author row */}
        <div className="flex items-start gap-2 mb-3">
          <Avatar
            src={post.owner.picture}
            alt={`${post.owner.firstName}${post}tar`}
            sx={{ width: 48, height: 48 }}
          />
          <div className="flex-1 min-w-0">
            <Typography variant="body2" className="truncate">
              <strong>Author:</strong> {post.owner.firstName} {post.owner.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Posted:</strong> {new Date(post.publishDate).toLocaleDateString()}
            </Typography>
          </div>

          {/* Edit button */}
          <Tooltip title="Edit post">
            <IconButton
              size="small"
              color="primary"
              onClick={() => openModal("edit", post)}
              aria-label="Edit post"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Delete button */}
          <Tooltip title="Delete post">
            <IconButton
              size="small"
              color="error"
              onClick={() => openModal("delete", post)}
              aria-label="Delete post"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>

      </CardContent>

      {/* Post image */}
      <div className="relative">
        <CardMedia
          component="img"
          height="240"
          image={post.image}
          alt="Post cover"
          sx={{ height: 240, objectFit: "cover" }}
        />
        {/* Likes badge overlaid on image */}
        <div className="absolute bottom-2 left-4">
          <Tooltip title="Likes">
            <Chip
              icon={<ThumbUpIcon fontSize="small" />}
              label={post.likes ?? 0}
              size="small"
              color="primary"
              sx={{ fontWeight: 700 }}
            />
          </Tooltip>
        </div>
      </div>

      {/* Tags */}
      <CardContent sx={{ pt: 1.5, pb: "12px !important" }}>
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag, index) => (
            <Chip
              key={`${tag}-${index}`}
              label={tag}
              size="small"
              variant="outlined"
              color="primary"
              sx={{ fontSize: "0.7rem" }}
            />
          ))}
        </div>
      </CardContent>

    </Card>
  );
}