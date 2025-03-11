import React from "react";

interface HotspotImageViewerProps {
  title: string;
  description: string;
  image: string;
  onClose: () => void;
}

const HotspotImageViewer: React.FC<HotspotImageViewerProps> = ({
  title,
  description,
  image,
  onClose,
}) => {
  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="hotspot-image-viewer-overlay" onClick={handleOverlayClick}>
      <div className="hotspot-image-viewer">
        <div className="hotspot-image-viewer-header">
          <h3 className="hotspot-image-viewer-title">{title}</h3>
          <button className="hotspot-image-viewer-close" onClick={onClose}>
            <svg
              className="close-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              />
            </svg>
          </button>
        </div>
        <div className="hotspot-image-viewer-content">
          <div className="hotspot-image-container">
            <img
              src={image}
              alt={title}
              className="hotspot-fullsize-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Set a fallback image URL if local image fails to load
                target.src =
                  "/Vehicle images/Compact SUV/Corolla Cross/THE-COROLLA-CROSS.jpg";
              }}
            />
          </div>
          <div className="hotspot-image-info">
            <p className="hotspot-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotspotImageViewer;