import { React } from "react"

const GALLERY_IMAGES = [
  "image.jpg", "image-1.jpg", "image-2.jpg", "image-3.jpg",
  "image-4.jpg", "image-5.jpg", "image-6.jpg", "image-7.jpg",
  "image-8.jpg", "image-9.jpg", "image-10.jpg", "image-11.jpg",
].map((name) => `https://flowbite.s3.amazonaws.com/docs/gallery/square/${name}`);


export function ImageGallery({ onSelect, selectedImage }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {GALLERY_IMAGES.map((src) => (
        <div
          key={src}
          onClick={() => onSelect(src)}
          className={`cursor-pointer rounded-lg border-2 transition-all ${
            selectedImage === src ? "border-blue-500" : "border-transparent"
          }`}
        >
          <img className="h-auto max-w-full rounded-lg" src={src} alt="Gallery option" />
        </div>
      ))}
    </div>
  );
}