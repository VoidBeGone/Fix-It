import Spline from '@splinetool/react-spline';

export default function Home() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Spline 3D Object */}
      <Spline
        scene="https://prod.spline.design/X4-YlQ36HwYEXpw0/scene.splinecode"
        style={{
          position: 'absolute',
          top: '50%',         // Align vertically in the middle
          left: '10%',        // Position the wrench on the left side
          width: '30vw',      // Control size (optional)
          height: 'auto',
          zIndex: -1          // Ensure it goes behind the content
        }}
      />
      
      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          margin: '0 auto',
          width: '60vw',
          height: '300px',
          background: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1>Order Service near you</h1>
          <input type="text" placeholder="Enter delivery address" style={{ marginBottom: '10px', padding: '10px' }} />
          <button style={{ marginRight: '10px' }}>Schedule now</button>
          <button>Search here</button>
        </div>
      </main>
    </div>
  );
}
