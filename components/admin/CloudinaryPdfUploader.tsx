"use client";

import { useState, useRef } from "react";
import {
  FileText,
  Upload,
  X,
  CheckCircle,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface CloudinaryPdfUploaderProps {
  onUploadSuccess: (url: string) => void;
  currentPdfUrl?: string;
}

export function CloudinaryPdfUploader({
  onUploadSuccess,
  currentPdfUrl,
}: CloudinaryPdfUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState<string>(currentPdfUrl ?? "");
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const uploadFile = async (file: File) => {
    if (!cloudName || !uploadPreset) {
      setError(
        "Cloudinary is not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to your .env.local."
      );
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are accepted for book soft copies.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("PDF file must be under 50MB.");
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "mwalimu-maronga/pdfs");
      formData.append("resource_type", "raw");

      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 8, 90));
      }, 300);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        { method: "POST", body: formData }
      );

      clearInterval(progressInterval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message ?? "PDF upload failed");
      }

      const data = await response.json();
      setProgress(100);
      setUploadedUrl(data.secure_url);
      onUploadSuccess(data.secure_url);

      setTimeout(() => {
        setProgress(0);
        setUploading(false);
      }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
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
        onClick={() => !uploading && !uploadedUrl && inputRef.current?.click()}
        className="relative rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden"
        style={{
          borderColor: dragOver
            ? "#6366f1"
            : error
            ? "#ef4444"
            : uploadedUrl
            ? "rgba(99,102,241,0.5)"
            : "rgba(255,255,255,0.12)",
          background: dragOver
            ? "rgba(99,102,241,0.06)"
            : "rgba(255,255,255,0.02)",
          cursor: uploading || uploadedUrl ? "default" : "pointer",
        }}
        id="pdf-drop-zone"
      >
        {uploadedUrl ? (
          // Uploaded state
          <div className="flex items-center gap-4 p-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(99,102,241,0.15)" }}
            >
              <FileText className="w-6 h-6" style={{ color: "#6366f1" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {fileName || "PDF uploaded successfully"}
              </p>
              <p className="text-xs mt-0.5 truncate" style={{ color: "#6b7280" }}>
                {uploadedUrl}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={uploadedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs flex items-center gap-1 font-medium"
                  style={{ color: "#6366f1" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Preview PDF <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUploadedUrl("");
                setFileName("");
                onUploadSuccess("");
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" style={{ color: "#ef4444" }} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "rgba(99,102,241,0.12)" }}
            >
              <Upload className="w-7 h-7" style={{ color: "#6366f1" }} />
            </div>
            <p className="text-sm font-medium text-white mb-1">
              Drag & drop the PDF book file here
            </p>
            <p className="text-xs" style={{ color: "#6b7280" }}>
              or click to browse — PDF only · max 50MB
            </p>
          </div>
        )}

        {/* Upload progress overlay */}
        {uploading && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: "rgba(15,17,23,0.85)" }}
          >
            <Loader2 className="w-7 h-7 animate-spin mb-3" style={{ color: "#6366f1" }} />
            <p className="text-sm text-white font-medium mb-3">
              Uploading PDF to Cloudinary…
            </p>
            <div
              className="w-48 h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #6366f1, #818cf8)",
                }}
              />
            </div>
            <p className="text-xs mt-1.5" style={{ color: "#6b7280" }}>
              {progress}% · {fileName}
            </p>
          </div>
        )}

        {/* Done flash */}
        {progress === 100 && !uploading && (
          <div
            className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: "rgba(99,102,241,0.15)" }}
          >
            <CheckCircle className="w-4 h-4" style={{ color: "#818cf8" }} />
            <span className="text-xs font-medium" style={{ color: "#818cf8" }}>
              PDF uploaded
            </span>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
        id="pdf-file-input"
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
            background: "rgba(99,102,241,0.06)",
            borderColor: "rgba(99,102,241,0.2)",
            color: "#a5b4fc",
          }}
        >
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <p>
            Configure Cloudinary credentials in <code className="font-mono">.env.local</code> to
            enable PDF uploads.
          </p>
        </div>
      )}
    </div>
  );
}
