// src/components/Nav.jsx
import { AppBar, Toolbar, Typography, TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { usePost } from "../context/PostContext";

export function Nav() {
  const { searchQuery, setSearchQuery, filteredPosts, total, debouncedQuery, theme, toggleTheme } = usePost();

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar className="mx-auto w-full 2xl:px-40 xl:px-20 gap-4">

        {/* Logo */}
        <Typography
          variant="h6"
          component="a"
          href="/"
          className="shrink-0 no-underline font-bold"
          color="primary"
          sx={{ textDecoration: "none", fontWeight: 700 }}
        >
          PostApp
        </Typography>

        {/* Search input */}
        <TextField
          size="small"
          fullWidth
          placeholder="Search by author or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ maxWidth: 480 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery("")} aria-label="Clear search">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Live result count */}
        {debouncedQuery && (
          <Typography variant="caption" color="text.secondary" className="shrink-0 whitespace-nowrap">
            {filteredPosts.length} of {total} posts
          </Typography>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Theme toggle */}
        <IconButton onClick={toggleTheme} color="inherit" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
          {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}