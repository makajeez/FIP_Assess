import { usePost } from "../context/PostContext";

export function PostCard({ post }) {
  const { openModal } = usePost();

  return (
    <div className="bg-white dark:bg-gray-800 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 transition duration-300 max-w-sm rounded overflow-hidden shadow-lg dark:shadow-gray-900">
      <div className="py-4 px-8">

        <div className="flex items-start gap-2 mb-3">
          <img
            src={post.owner.picture}
            className="rounded-full h-12 w-12 shrink-0"
            alt={`${post.owner.firstName}'s avatar`}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-light truncate text-gray-800 dark:text-gray-200">
              <strong>Author:</strong> {post.owner.firstName} {post.owner.lastName}
            </p>
            <p className="text-sm font-light text-gray-800 dark:text-gray-200">
              <strong>Posted:</strong> {new Date(post.publishDate).toLocaleDateString()}
            </p>
          </div>

          {/* Edit button */}
          <button
            type="button"
            onClick={() => openModal("edit", post)}
            className="inline-flex items-center p-1 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            aria-label="Edit post"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>

          {/* Delete button */}
          <button
            type="button"
            onClick={() => openModal("delete", post)}
            className="inline-flex items-center p-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label="Delete post"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>

        {/* Post image with likes badge */}
        <figure className="relative transition-all duration-300 hover:grayscale">
          <img
            className="w-full h-60 object-cover rounded-lg"
            src={post.image}
            alt="Post cover"
          />
          <figcaption className="absolute px-4 text-lg text-white bottom-2">
            <button
              type="button"
              className="relative inline-flex items-center p-1 text-lg font-bold text-gray-900 bg-indigo-300 rounded-lg hover:bg-indigo-400"
            >
              <span className="material-symbols-outlined">thumb_up</span>
              <span className="sr-only">Likes</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-900 bg-indigo-400 border-2 border-indigo-400 rounded-full -top-4 -right-2">
                {post.likes}
              </div>
            </button>
          </figcaption>
        </figure>

        {/* Post tags */}
        <div className="mt-2 flex flex-wrap gap-1">
          {post.tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="bg-indigo-100 dark:bg-indigo-900 text-black dark:text-indigo-200 text-xs px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}