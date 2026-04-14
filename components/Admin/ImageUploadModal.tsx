'use client';

import { useCreateGalleryMutation } from "@/redux/GallerySlice";
import { useLazyGetLocationsQuery } from "@/redux/locationSlice";
import { form } from "framer-motion/client";
import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

const CATEGORIES = ["Window", "Balcony", "Other"] as const;
type Category = (typeof CATEGORIES)[number];

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  file?: string;
  category?: string;
  location?: string;
}

export default function ImageUploadModal({
  isOpen,
  onClose,
}: ImageUploadModalProps) {

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | "">("");
  const [location, setLocation] = useState<string>(""); // ✅ FIXED

  const [dragging, setDragging] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ RTK Query
  const [getLocations, { data: locationsData, isLoading }] =
    useLazyGetLocationsQuery();

    const [creategallery , {isLoading:galleryLoading , isError}] = useCreateGalleryMutation()

  useEffect(() => {
    if (isOpen) {
      getLocations(); // fetch only when modal opens
    }
  }, [isOpen]);

  // ✅ Map locations
  const locationOptions =
    locationsData?.map((loc: any) => ({
      value: loc._id,
      label: `${loc.city} - ${loc.area}`,
    })) || [];

  const handleFile = (f: File): void => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
    setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) handleFile(dropped);
  }, []);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (): void => setDragging(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!file) errs.file = "Please select an image.";
    if (!category) errs.category = "Please select a category.";
    if (!location) errs.location = "Please select a location.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validate()) return;

   const formData = new FormData()

   if (file) {
     formData.append("file", file);
   }
   formData.append("category" , category)
   formData.append("locationId" , location)

    try {
      await creategallery(formData).unwrap();
      toast.success("Image uploaded successfully.");
      handleClose();
    } catch (error) {
      console.error("Something went wrong uploading the image:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleClose = (): void => {
    setFile(null);
    setPreview(null);
    setCategory("");
    setLocation("");
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-gray-900 text-lg font-semibold">
              Upload Image
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Add image with category & location
            </p>
          </div>

          <button onClick={handleClose}>✕</button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">

          {/* Image Upload */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />

            {preview ? (
              <img src={preview} className="h-40 w-full object-cover rounded" />
            ) : (
              <p>Drop image or click to upload</p>
            )}
          </div>

          {errors.file && <p className="text-red-500">{errors.file}</p>}

          {/* Dropdowns */}
          <div className="grid grid-cols-2 gap-4">

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="p-3 border rounded-xl"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Location (Dynamic) */}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isLoading}
              className="p-3 border rounded-xl"
            >
              <option value="">
                {isLoading ? "Loading..." : "Select location"}
              </option>

              {locationOptions.map((loc: any) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>

          </div>

          {errors.category && <p className="text-red-500">{errors.category}</p>}
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6">
          <button onClick={handleClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}