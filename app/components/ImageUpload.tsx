import { CldUploadWidget } from "next-cloudinary";
import React from "react";

type ImageUploadProps = {
  onImageUpload: (url: string) => void;
};

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  return (
    <CldUploadWidget
      uploadPreset="wj68q01d"
      onSuccess={(result) => {
        if (result.info?.secure_url) {
          onImageUpload(result.info?.secure_url); // Pass the URL to the parent component
        }
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="bg-gray-700 text-white rounded hover:bg-gray-900 p-1"
          >
            Upload Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
