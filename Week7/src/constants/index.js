// ─────────────────────────────────────────────────────────────────────────────
// ENV CONFIG
// ─────────────────────────────────────────────────────────────────────────────
export const ENV = {
  apiId: "6597b9a018bdf6b554c5fdd8",
  baseUrl: "https://dummyapi.io/data/v1/",
  userID: "6497b9a018bdf6b554c5fdd8"
};

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY IMAGES
// ─────────────────────────────────────────────────────────────────────────────
export const GALLERY_IMAGES = [
  "image.jpg", "image-1.jpg", "image-2.jpg",  "image-3.jpg",
  "image-4.jpg", "image-5.jpg", "image-6.jpg", "image-7.jpg",
  "image-8.jpg", "image-9.jpg", "image-10.jpg","image-11.jpg",
].map((name) => `https://flowbite.s3.amazonaws.com/docs/gallery/square/${name}`);