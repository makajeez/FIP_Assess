import { usePost } from "../context/PostContext";
import { PostCard } from "./PostCard";
import { DeleteModal } from "./modals/DeleteModal";
import { EditModal } from "./modals/EditModal";
import { AddModal } from "./modals/AddModal";
import { Button, Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export function Card() {
  const {
    filteredPosts,
    isLoading,
    error,
    searchQuery,
    debouncedQuery,
    openModal,
    page,
    limit,
    total,
    canGoPrev,
    canGoNext,
    handlePrev,
    handleNext,
  } = usePost();

 return (
    <div className="min-h-screen dark:bg-gray-950 light:bg-white">  
      <div className="mx-auto 2xl:px-40 xl:px-20 px-8 py-20">
        <div className="inline-flex">
          <Tooltip title="Add new post">
            <Fab
              color="primary"
              size="medium"
              onClick={() => openModal("add")}
              aria-label="Add new post"
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>

        <hr className="my-10 border-gray-200 dark:border-gray-700" />

        {/* ── Loading state ── */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">Loading posts...</p>
          </div>
        )}

        {/* ── Error state ── */}
        {error && !isLoading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* ── Post grid ── */}
        {!isLoading && !error && filteredPosts.length > 0 && (
          <>
            <div className="sm:grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-10">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <hr className="my-10 border-gray-200 dark:border-gray-700" />

            {/* ── Pagination — hidden during active search (dummyAPI doesn't support what we need, so filtering is client side) ── */}
            {!debouncedQuery && (
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">{limit * page + 1}</span> to{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">{Math.min(limit * (page + 1), total)}</span> of{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
                </span>
                <div className="inline-flex mt-2">
                  <Button
                    onClick={handlePrev}
                    disabled={!canGoPrev}
                    variant="contained"
                    color="inherit"
                    size="small"
                    startIcon={<NavigateBeforeIcon />}
                    disableElevation
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canGoNext}
                    variant="contained"
                    color="inherit"
                    size="small"
                    endIcon={<NavigateNextIcon />}
                    disableElevation
                    sx={{ ml: 1 }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── Empty state ── */}
        {!isLoading && !error && filteredPosts.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {searchQuery
                ? `No posts found matching "${searchQuery}"`
                : "No posts found"}
            </p>
          </div>
        )}

        {/* ── Modals — each self-manages its own visibility via context ── */}
        <AddModal />
        <EditModal />
        <DeleteModal />

      </div>
    </div>
  );
}