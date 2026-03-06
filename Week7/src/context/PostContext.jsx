import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { ENV } from "../constants";
import { useDebounce } from "../hooks/useDebounce";

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT CREATION
// ─────────────────────────────────────────────────────────────────────────────
const PostContext = createContext(null);



export function usePost() {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePost must be used within a PostProvider");
  return context;
}
// ─────────────────────────────────────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────────────────────────────────────
export function PostProvider({ children }) {
  // ── Post data state ─────────────────────────────────────────────────────────
  const [postData, setPostData]           = useState([]);
  const [total, setTotal]                 = useState(0);
  const [page, setPage]                   = useState(0);
  const [limit]                           = useState(10);
  const [isLoading, setIsLoading]         = useState(false);
  const [error, setError]                 = useState(null)
  const [authd, setAuthd] = useState(false);
  const [user, setUser] = useState(null);

  // ── Modal + selection state ─────────────────────────────────────────────────
  const [selectedPost, setSelectedPost]   = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [modalState, setModalState]       = useState({
    add: false, edit: false, delete: false,
  });

  // ── Search state ────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery]     = useState("");
  const debouncedQuery                    = useDebounce(searchQuery, 300);

  // ── Modal helpers ───────────────────────────────────────────────────────────
  const openModal = (type, post = null) => {
    setSelectedPost(post);
    setSelectedImage(post?.image || "");
    setModalState((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
    setSelectedPost(null);
    setSelectedImage("");
  };

  // ── Fetch posts ─────────────────────────────────────────────────────────────
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ENV.baseUrl}post?limit=${limit}&page=${page}`,
        { headers: { "app-id": ENV.apiId } }
      );
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setPostData(data.data);
      setTotal(data.total);
    } catch (err) {
      setError("Failed to load posts. Please try again.", err);
    } finally {
      setIsLoading(false);
    }
  }, [limit, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ── API actions ─────────────────────────────────────────────────────────────
  const addPost = async (newPost) => {
    try {
      await fetch(`${ENV.baseUrl}post`, {
        method: "POST",
        headers: { "app-id": ENV.apiId, "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      fetchPosts();
      closeModal("add");
    } catch {
      setError("Failed to add post.");
    }
  };

  const editPost = async (updatedPost) => {
    try {
      await fetch(`${ENV.baseUrl}post/${selectedPost.id}`, {
        method: "PUT",
        headers: { "app-id": ENV.apiId, "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
      fetchPosts();
      closeModal("edit");
    } catch {
      setError("Failed to update post.");
    }
  };

  const deletePost = async () => {
    try {
      await fetch(`${ENV.baseUrl}post/${selectedPost.id}`, {
        method: "DELETE",
        headers: { "app-id": ENV.apiId },
      });
      fetchPosts();
      closeModal("delete");
    } catch {
      setError("Failed to delete post.");
    }
  };

  // ── Derived: client-side filtered posts ────────────────────────────────────
  const filteredPosts = debouncedQuery.trim() === ""
    ? postData
    : postData.filter((post) => {
        const query    = debouncedQuery.toLowerCase();
        const fullName = `${post.owner.firstName} ${post.owner.lastName}`.toLowerCase();
        const tags     = post.tags.join(" ").toLowerCase();
        return fullName.includes(query) || tags.includes(query);
      });

  // ── Pagination helpers ──────────────────────────────────────────────────────
  const totalPages = Math.ceil(total / limit);
  const canGoPrev  = page > 0;
  const canGoNext  = page < totalPages - 1;
  const handlePrev = () => { if (canGoPrev) setPage((p) => p - 1); };
  const handleNext = () => { if (canGoNext) setPage((p) => p + 1); };

  // ── Context value ───────────────────────────────────────────────────────────
  const value = {
    authd, setAuthd, user, setUser,
    postData, filteredPosts, total, page, limit, isLoading, error,
    selectedPost, selectedImage, setSelectedImage,
    modalState, openModal, closeModal,
    fetchPosts, addPost, editPost, deletePost,
    searchQuery, setSearchQuery, debouncedQuery,
    canGoPrev, canGoNext, handlePrev, handleNext,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}
