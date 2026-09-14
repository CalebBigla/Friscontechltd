import { useState, useRef } from "react";
import { Upload, X, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ImageUploadProps {
  currentImageUrl: string | null;
  onImageChange: (url: string | null) => void;
  bucketName?: string;
  folder?: string;
  maxSizeMB?: number;
}

export function ImageUpload({
  currentImageUrl,
  onImageChange,
  bucketName = "team-images",
  folder = "team",
  maxSizeMB = 5,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPG, PNG, or WebP)");
      return;
    }

    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
    if (file.size > maxSize) {
      toast.error(`Image must be smaller than ${maxSizeMB}MB`);
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;
      
      // Update preview and notify parent
      setPreviewUrl(publicUrl);
      onImageChange(publicUrl);
      
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Team Member Photo
      </label>
      
      <div className="flex items-start gap-4">
        {/* Preview */}
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200 flex-shrink-0">
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Team member" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={40} className="text-gray-400" />
          )}
        </div>

        {/* Controls */}
        <div className="flex-1">
          <div className="flex gap-2">
            <label
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium cursor-pointer transition-colors
                ${isUploading 
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                  : "bg-green text-white hover:bg-green/90"
                }
              `}
            >
              <Upload size={18} />
              {isUploading ? "Uploading..." : previewUrl ? "Replace Image" : "Upload Image"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileSelect}
                disabled={isUploading}
                className="hidden"
              />
            </label>

            {previewUrl && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={isUploading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                <X size={18} />
                Remove
              </button>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {previewUrl 
              ? "Current image. Click 'Replace' to upload a new one." 
              : "Upload a photo or leave blank for default avatar"
            }
          </p>
          <p className="text-xs text-gray-400 mt-1">
            JPG, PNG, or WebP • Max {maxSizeMB}MB • Recommended: Square, at least 400×400px
          </p>
        </div>
      </div>
    </div>
  );
}
