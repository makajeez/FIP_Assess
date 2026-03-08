import { GALLERY_IMAGES } from "../constants";

export function ImageGallery({ onSelect, selectedImage }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Select an image</p>
      <div className="grid grid-cols-4 gap-2">
        {GALLERY_IMAGES.map((src) => (
          <div
            key={src}
            onClick={() => onSelect(src)}
            className={`cursor-pointer rounded-lg border-2 transition-all ${
              selectedImage === src
                ? "border-indigo-500 scale-95"
                : "border-transparent hover:border-indigo-300"
            }`}
          >
            <img
              className="h-auto w-full rounded-lg object-cover"
              src={src}
              alt="Gallery option"
            />
          </div>
        ))}
      </div>
    </div>
  );
}