/**
 * ImageUpload Component
 * Handles image file selection with validation and compression
 */

"use client";

import toast from "react-hot-toast";
import { processImage } from "../../../lib/utils/imageProcessor";

/**
 * ImageUpload Component
 */
export default function ImageUpload({
  images = [],
  setImages,
  multiple = false,
  label = "Upload Image",
}) {
  /**
   * Handles file selection and processing
   * Validates file type and compresses images
   */
  const handleChange = async (e) => {
    const files = Array.from(e.target.files);
    let updated = [...images];

    for (let file of files) {
      // type check
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files allowed");
        return;
      }

      // process (compress)
      const processed = await processImage(file);

      updated.push(processed);
    }

    // Update images (single or multiple based on prop)
    setImages(multiple ? updated : [updated[0]]);
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
      />
    </div>
  );
}

