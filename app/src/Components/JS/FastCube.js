import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../style/FastCube.css";
export default function FastCube() {
  const cubeRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Start the cube from just inside the left edge and move it to the right
      gsap.fromTo(
        cubeRef.current,
        {
          x: 0, // Start just inside the left edge
          y: window.innerHeight / 2 - 50, // Center vertically
          rotation: 0, // Initial rotation
        },
        {
          duration: 8,
          x: window.innerWidth - 100, // Moves cube near the right edge, keeping it in view
          rotation: 360 * 4, // Spin 4 full rotations
          ease: "power2.inOut",
          repeat: -1, // Repeat indefinitely
          yoyo: true, // Moves back and forth between start and end positions
        }
      );
    });

    return () => ctx.revert(); // Cleanup on component unmount
  }, []);

  return (
    <div
      ref={cubeRef}
      className="cube"
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "lightblue",
        position: "absolute",
        top: "50%",
        left: "0", // Start from the left side
        transform: "translateY(-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: "1000px",
      }}
    >
      <div className="circle"></div>
    </div>
  );
}
