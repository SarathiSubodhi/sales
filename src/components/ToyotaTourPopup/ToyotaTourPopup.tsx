import { useState } from "react";
import "./Popup.css"; // Import the CSS file

export default function ToyotaTourPopup() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="">
      {/* Button to Open Popup */}
      <button onClick={() => setShowPopup(true)} className="open-btn">
        Interior View
      </button>
      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            {/* Close Button */}
            {/* Close Button */}
<button 
  onClick={() => setShowPopup(false)} 
  className="close-btn" 
  aria-label="Close"
>
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>

            {/* Embedded Toyota Tour */}
            <iframe
              src="https://www.toyota.co.th/media/product/series/interior_360/yarisativ/tour.html"
              className="popup-iframe"
            ></iframe>
          </div>
        </div>
      )}
         
    </div>
  );
}
