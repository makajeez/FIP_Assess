import { PostProvider } from "./context/PostContext";
import { Nav } from "./components/Nav";
import { Card } from "./components/Card";


export default function App() {
  return (
    <PostProvider>
      <Nav />
      <Card />
    </PostProvider>
  );
}