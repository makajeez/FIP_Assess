import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { PostProvider, usePost } from "./context/PostContext";
import { Nav } from "./components/Nav";
import { Card } from "./components/Card";
import { PostDetails } from "./components/PostDetails";


function MuiThemeWrapper({ children }) {
  const { theme } = usePost();

  const muiTheme = useMemo(() =>
    createTheme({
      palette: {
        mode: theme,  
        primary: {
          main: "#6366f1",  
        },
        error: {
          main: "#ef4444", 
        },
      },
    }),
  [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}


export default function App() {
  return (
    <PostProvider>
      <MuiThemeWrapper>
        <Nav />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </MuiThemeWrapper>
    </PostProvider>
  );
}