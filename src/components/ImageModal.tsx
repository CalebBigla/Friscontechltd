import { useEffect } from "react";
import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
  title?: string;
  subtitle?: string;
}

export function ImageModal({ isOpen, onClose, imageUrl, altText, title, subtitle }: ImageModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="image-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="image-modal-close"
          aria-label="Close image"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <img
          src={imageUrl}
          alt={altText}
          className="image-modal-img"
        />

        {/* Caption */}
        {(title || subtitle) && (
          <div className="image-modal-caption">
            {title && <div className="image-modal-title" id="modal-title">{title}</div>}
            {subtitle && <div className="image-modal-subtitle">{subtitle}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
