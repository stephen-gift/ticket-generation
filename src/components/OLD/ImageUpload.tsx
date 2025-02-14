"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Loader2 } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import axios, { AxiosError } from "axios";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";

interface ImageUploaderProps {
  name: string;
}

const CLOUDINARY_UPLOAD_PRESET = "tickets";
const CLOUDINARY_CLOUD_NAME = "dbsmpdrck";

const ImageUploader = ({ name }: ImageUploaderProps) => {
  const { setValue } = useFormContext();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      setValue(name, imageUrl); // Update form value with Cloudinary URL
    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion for Axios error
      alert(`Upload failed! Try again: ${axiosError.message}`);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      uploadToCloudinary(file);
    }
  });

  return (
    <FormField
      name={name}
      render={({ fieldState }) => (
        <FormItem className="flex flex-col gap-2 w-full">
          <FormLabel className="text-[#FAFAFA] text-[16px] font-normal">
            Upload Profile Photo
          </FormLabel>
          <FormControl>
            <div className="flex flex-col justify-center items-center gap-8 p-6 w-full bg-[#052228] rounded-3xl">
              <div className="w-full bg-[#00000033] flex justify-center items-center">
                {!image ? (
                  <div
                    {...getRootProps()}
                    className="border-2 border-[rgba(36, 160, 181, 0.50)] bg-[#0E464F] w-full text-white-pure max-w-64 h-64 flex flex-col items-center justify-center rounded-[32px] cursor-pointer hover:bg-[#1b3d42e7] transition"
                  >
                    <input {...getInputProps()} />
                    {loading ? (
                      <Loader2 className="animate-spin text-teal-400 w-8 h-8" />
                    ) : (
                      <>
                        <UploadCloud className="text-teal-400 w-8 h-8" />
                        <p className="mt-2 text-sm">
                          Drag & drop or click to upload
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative ">
                    <Image
                      src={image}
                      alt="Uploaded"
                      style={{
                        width: "240px",
                        height: "240px"
                      }}
                      width={240}
                      height={240}
                    />
                  </div>
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default ImageUploader;
