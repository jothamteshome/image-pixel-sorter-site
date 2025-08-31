import { ImageSelectionPage } from "../image-picker/imagePicker";

export function meta() {
  return [
    { title: "Image Pixel Sorter" },
    { name: "description", content: "This application sorts an uploaded image's pixels by their squared distance to the color black" },
  ];
}

export default function Home() {
  return <ImageSelectionPage />;
}
