import React, { useState, useEffect, useRef } from "react";
import "./Vehicle3DView.css";

interface Vehicle3DViewProps {
  images: string[];
  vehicleName: string;
  onClose: () => void;
  fallbackImage: string;
}

const Vehicle3DView: React.FC<Vehicle3DViewProps> = ({
  images,
  vehicleName,
  onClose,
  fallbackImage,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true); // Auto-rotate by default
  const [nextImageIndex, setNextImageIndex] = useState<number>(1);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const autoRotateInterval = useRef<NodeJS.Timeout | null>(null);
  const rotationSpeed = 200; // Lower value = faster rotation (milliseconds)
  
  // Track if we're dragging
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const dragThreshold = 20; // Minimum pixel movement to trigger rotation

  // Preload all images for smoother transitions
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    // Clean up any interval when component unmounts
    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isAutoRotating && !isDragging) {
      autoRotateInterval.current = setInterval(() => {
        rotateToNextImage();
      }, rotationSpeed);
    } else if (autoRotateInterval.current) {
      clearInterval(autoRotateInterval.current);
    }

    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
      }
    };
  }, [isAutoRotating, isDragging, currentImageIndex, images.length]);

  const rotateToNextImage = () => {
    setFadeState('out');
    setNextImageIndex((currentImageIndex + 1) % images.length);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setNextImageIndex((nextImageIndex + 1) % images.length);
      setFadeState('in');
    }, 100); // Half the rotation speed for smooth crossfade
  };

  const handlePrevImage = () => {
    if (isAutoRotating) return;
    
    setFadeState('out');
    const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setNextImageIndex(prevIndex);
    
    setTimeout(() => {
      setCurrentImageIndex(prevIndex);
      setFadeState('in');
    }, 100);
  };

  const handleNextImage = () => {
    if (isAutoRotating) return;
    rotateToNextImage();
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackImage;
  };

  // Handle mouse events for manual rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAutoRotating) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartX;
    
    if (Math.abs(deltaX) > dragThreshold) {
      if (deltaX > 0) {
        handlePrevImage();
      } else {
        handleNextImage();
      }
      setDragStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch events for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isAutoRotating) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - dragStartX;
    
    if (Math.abs(deltaX) > dragThreshold) {
      if (deltaX > 0) {
        handlePrevImage();
      } else {
        handleNextImage();
      }
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="model-view-modal">
      <div className="model-view-header">
        <div className="model-view-title">{vehicleName} - 3D View</div>
        <button className="model-view-close" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="model-view-content">
        <div 
          className={`model-view-image-container ${isAutoRotating ? 'auto-rotating' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`image-transition ${fadeState}`}>
            <img
              src={images[currentImageIndex]}
              alt={`${vehicleName} 3D view angle ${currentImageIndex + 1}`}
              className="model-view-image"
              onError={handleImageError}
            />
          </div>
          
          {isAutoRotating && (
            <div className="rotation-indicator">
              <div className="rotation-circle"></div>
            </div>
          )}
        </div>

        <div className="model-view-arrows">
          <button 
            className="model-view-arrow" 
            onClick={handlePrevImage}
            disabled={isAutoRotating}
          >
            ‹
          </button>
          <button 
            className="model-view-arrow" 
            onClick={handleNextImage}
            disabled={isAutoRotating}
          >
            ›
          </button>
        </div>

        <div className="model-view-nav">
          {images.map((_, index) => (
            <div
              key={index}
              // className={`model-view-nav-dot ${
              //   index === currentImageIndex ? "active" : ""
              // }`}
              onClick={() => {
                if (!isAutoRotating) {
                  setCurrentImageIndex(index);
                }
              }}
            />
          ))}
        </div>

        <div className="model-view-controls">
          <button 
            className={`model-view-control ${isAutoRotating ? 'active-rotation' : ''}`} 
            onClick={toggleAutoRotate}
          >
            {isAutoRotating ? "Stop Auto-Rotate" : "Start Auto-Rotate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vehicle3DView;