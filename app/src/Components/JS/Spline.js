import Spline from '@splinetool/react-spline';
import { useRef } from 'react';

export default function SplineElement() {
  const wrenchRef = useRef(null);
  const hammerRef = useRef(null);


  return (
    <div style={{ position: 'fixed', width: '100vw', height: '100vh' }}>
      {/* Wrench */}
      <Spline
        scene="https://prod.spline.design/X4-YlQ36HwYEXpw0/scene.splinecode"
        ref={wrenchRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '10%', // Adjust starting point
          width: '20vw',
          height: '100vh',
          background: 'transparent',
          zIndex: -1,
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      />

      {/* Hammer */}
      <Spline
        scene="https://prod.spline.design/SVgjv2TO5s8NDQ2N/scene.splinecode"
        ref={hammerRef}
        style={{
          position: 'fixed',
          top: '50%',
          right: '10%', // Adjust starting point
          width: '20vw',
          height: '100vh',
          background: 'transparent',
          zIndex: -1,
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      />
    </div>
  );
}
