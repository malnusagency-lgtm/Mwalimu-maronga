"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  ImagePlus,
  X,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface CloudinaryUploaderProps {
  onUploadSuccess: (url: string) => void;
  currentImage?: string;
}

export function CloudinaryUploader({
  onUploadSuccess,
  currentImage,
}: CloudinaryUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string>(currentImage ?? "");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const uploadFile = async (file: File) => {
    if (!cloudName || !uploadPreset) {
      setError(
        "Cloudinary is not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to your .env.local file."
      );
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WebP, etc.)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10MB.");
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    // Optimistic preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "mwalimu-maronga/products");

      // Simulate progress (XHR-based for real progress; fetch doesn't support it)
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 12, 88));
      }, 200);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      clearInterval(progressInterval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message ?? "Upload failed");
      }

      const data = await response.json();
      setProgress(100);
      setPreview(data.secure_url);
      onUploadSuccess(data.secure_url);

      setTimeout(() => {
        setProgress(0);
        setUploading(false);
      }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(currentImage ?? "");
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className="relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden"
        style={{
          borderColor: dragOver
            ? "#1a5c38"
            : error
            ? "#ef4444"
            : preview
            ? "rgba(26,92,56,0.5)"
            : "rgba(255,255,255,0.12)",
          background: dragOver ? "rgba(26,92,56,0.08)" : "rgba(255,255,255,0.02)",
          minHeight: 200,
        }}
        id="cloudinary-drop-zone"
      >
        {/* Preview */}
        {preview ? (
          <div className="relative w-full h-52">
            <Image
              src={preview}
              alt="Product preview"
              fill
              className="object-cover"
              sizes="600px"
              unoptimized={preview.startsWith("blob:")}
            />
            {/* Overlay on hover */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(0,0,0,0.6)" }}
            >
              <div className="text-center text-white">
                <ImagePlus className="w-7 h-7 mx-auto mb-2" />
                <p className="text-sm font-medium">Replace image</p>
              </div>
            </div>
            {/* Clear button */}
            {!uploading && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview("");
                  onUploadSuccess("");
                }}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "rgba(26,92,56,0.15)" }}
            >
              <Upload className="w-7 h-7" style={{ color: "#1a5c38" }} />
            </div>
            <p className="text-sm font-medium text-white mb-1">
              Drag & drop your book cover here
            </p>
            <p className="text-xs" style={{ color: "#6b7280" }}>
              or click to browse — JPG, PNG, WebP · max 10MB
            </p>
          </div>
        )}

        {/* Upload progress overlay */}
        {uploading && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: "rgba(15,17,23,0.85)" }}
          >
            <Loader2 className="w-8 h-8 animate-spin mb-3" style={{ color: "#1a5c38" }} />
            <p className="text-sm text-white font-medium mb-3">
              Uploading to Cloudinary…
            </p>
            <div
              className="w-48 h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #1a5c38, #22c55e)",
                }}
              />
            </div>
            <p className="text-xs mt-1.5" style={{ color: "#6b7280" }}>
              {progress}%
            </p>
          </div>
        )}

        {/* Done overlay */}
        {progress === 100 && !uploading && (
          <div
            className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: "rgba(34,197,94,0.15)" }}
          >
            <CheckCircle className="w-4 h-4" style={{ color: "#22c55e" }} />
            <span className="text-xs font-medium" style={{ color: "#22c55e" }}>
              Uploaded to Cloudinary
            </span>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        id="cloudinary-file-input"
      />

      {/* Error */}
      {error && (
        <div
          className="flex items-start gap-2 p-3 rounded-xl border text-sm"
          style={{
            background: "rgba(239,68,68,0.08)",
            borderColor: "rgba(239,68,68,0.2)",
            color: "#fca5a5",
          }}
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Config hint */}
      {(!cloudName || !uploadPreset) && (
        <div
          className="flex items-start gap-2 p-3 rounded-xl border text-xs"
          style={{
            background: "rgba(245,158,11,0.08)",
            borderColor: "rgba(245,158,11,0.2)",
            color: "#fcd34d",
          }}
        >
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <p>
            Cloudinary not configured. Add{" "}
            <code className="font-mono">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> and{" "}
            <code className="font-mono">NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> to{" "}
            <code className="font-mono">.env.local</code> and restart the dev server.
          </p>
        </div>
      )}
    </div>
  );
}
