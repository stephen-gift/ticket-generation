"use client";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios, { AxiosError } from "axios";
import { Loader2, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { ImageUploaderProps } from "../../types";
import { useTicketStore } from "../../store";

const CLOUDINARY_UPLOAD_PRESET = "tickets";
const CLOUDINARY_CLOUD_NAME = "dbsmpdrck";

const ImageUploader = ({ onImageUpload, initialImage }: ImageUploaderProps) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [loading, setLoading] = useState(false);
  const { currentTicket, updateCurrentTicket } = useTicketStore();

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

      const imageUrl = res.data.secure_url;
      setImage(imageUrl);
      onImageUpload(imageUrl);

      updateCurrentTicket({
        attendee: {
          ...currentTicket?.attendee,
          name: currentTicket?.attendee?.name || "",
          email: currentTicket?.attendee?.email || "",
          image: imageUrl
        }
      });
    } catch (error) {
      const axiosError = error as AxiosError;
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
    <div
      className="flex flex-col justify-center items-center gap-8 p-6 w-full bg-[#052228] rounded-3xl "
      aria-labelledby="upload-title"
    >
      <h2
        id="upload-title"
        className="text-lg font-semibold text-white text-start w-full text-white-pure"
      >
        Upload Profile Photo
      </h2>
      <div className="w-full bg-[#00000033] flex justify-center items-center">
        <div
          className="border-2 border-[rgba(36, 160, 181, 0.50)] w-full text-white-pure max-w-64 h-64 flex flex-col items-center justify-center rounded-[32px] cursor-pointer hover:bg-[#0E464Fe7] transition relative  border-4 border-[rgba(36,160,181,0.50)] bg-[#0E464F]"
          {...getRootProps()}
          tabIndex={0} // Ensure it's keyboard navigable
          role="button"
          aria-label="Upload an image by clicking or dragging"
        >
          <input {...getInputProps()} aria-describedby="upload-desc" />
          {!image ? (
            loading ? (
              <Loader2 className="animate-spin text-teal-500 w-8 h-8" />
            ) : (
              <>
                <UploadCloud className="text-teal-400 w-8 h-8" />
                <p id="upload-desc" className="mt-2 text-sm">
                  Drag & drop or click to upload
                </p>
              </>
            )
          ) : (
            <>
              <Image
                src={image}
                alt="Uploaded"
                fill
                className="object-cover rounded-[32px]"
              />
              <div
                role="presentation"
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[32px]"
              >
                <UploadCloud className="text-teal-400 w-8 h-8" />
                <p className="mt-2 text-sm text-white">Click to change</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                  onImageUpload("");
                  updateCurrentTicket({
                    attendee: {
                      ...currentTicket?.attendee,
                      name: currentTicket?.attendee?.name || "",
                      email: currentTicket?.attendee?.email || "",
                      image: ""
                    }
                  });
                }}
                aria-label="Remove uploaded image"
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
