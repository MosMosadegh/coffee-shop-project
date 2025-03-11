import React, { useState } from "react";

const GuidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={togglePanel}
        style={{
          padding: "10px 20px",
          backgroundColor: "#ff6900",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {isOpen ? "Close Guide" : "Open Guide"}
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: "10px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            maxWidth: "300px",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#241a1a" }}>User Guide</h3>
          <p style={{ color: "#333", lineHeight: "1.6" }}>
            Welcome to the 3D scene! Here’s how you can interact with it:
          </p>
          <ul style={{ paddingLeft: "20px", color: "#333" }}>
            <li>
              <strong>Click and drag</strong> to rotate the camera around the
              scene.
            </li>
            <li>
              <strong>Scroll the mouse wheel</strong> to zoom in and out.
            </li>
            <li>
              <strong>Double-click</strong> on the monitor to zoom in and enter
              the password.
            </li>
            <li>
              <strong>Click and hold</strong> the mouse button while moving to
              explore the scene.
            </li>
          </ul>
          <p style={{ color: "#333", lineHeight: "1.6" }}>
            Enjoy your experience! If you have any questions, feel free to reach
            out.
          </p>
        </div>
      )}
    </div>
  );
};

export default GuidePanel;