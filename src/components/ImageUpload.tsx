"use client";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios, { AxiosError } from "axios";
import { Loader2, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { ImageUploaderProps } from "../../types";

const CLOUDINARY_UPLOAD_PRESET = "tickets";
const CLOUDINARY_CLOUD_NAME = "dbsmpdrck";

const ImageUploader = ({ onImageUpload, initialImage }: ImageUploaderProps) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
    }
  }, [initialImage]);

  const uploadToCloudinary = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      setImage(res.data.secure_url);
      onImageUpload(res.data.secure_url);
    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion for Axios error
      alert(`Upload failed! Try again: ${axiosError.message}`);
    }
    setLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      uploadToCloudinary(file);
    }
  });

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-6 w-full bg-[#052228] rounded-3xl">
      <h2 className="text-lg font-semibold text-white text-start w-full text-white-pure">
        Upload Profile Photo
      </h2>
      <div className="w-full bg-[#00000033] flex justify-center items-center">
        {!image ? (
          <div
            {...getRootProps()}
            className="border-2 border-[rgba(36, 160, 181, 0.50)] bg-[#0E464F] w-full  text-white-pure max-w-64 h-64 flex flex-col items-center justify-center rounded-[32px] cursor-pointer hover:bg-[#1b3d42e7] transition"
          >
            <input {...getInputProps()} />
            {loading ? (
              <Loader2 className="animate-spin text-teal-500 w-8 h-8" />
            ) : (
              <>
                <UploadCloud className="text-teal-400 w-8 h-8" />
                <p className="mt-2 text-sm">Drag & drop or click to upload</p>
              </>
            )}
          </div>
        ) : (
          <div className="relative">
            <Image
              src={image}
              alt="Uploaded"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto"
              }}
              width={500}
              height={300}
            />
            <button
              onClick={() => {
                setImage(null);
                onImageUpload("");
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
