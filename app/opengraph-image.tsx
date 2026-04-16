import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'WeatherWatch - Your Personal Weather Companion';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  // Morning colors - using the morning theme as default
  const primary = '#FF6B6B';
  const secondary = '#FFD166';

  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(45deg, #000000, #121212)`,
        position: 'relative',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 30%, ${primary}40 0%, transparent 70%), 
                         radial-gradient(circle at 70% 70%, ${secondary}40 0%, transparent 70%)`,
          opacity: 0.4,
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: '70%',
            height: '70%',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 80,
            fontWeight: 'bold',
          }}
        >
          WW
        </div>
      </div>

      {/* Text */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            background: `linear-gradient(to right, ${primary}, ${secondary})`,
            backgroundClip: 'text',
            color: 'transparent',
            margin: 0,
            padding: 0,
          }}
        >
          WeatherWatch
        </h1>
        <p
          style={{
            fontSize: 36,
            color: 'white',
            opacity: 0.8,
            marginTop: 20,
          }}
        >
          Your Personal Weather Companion
        </p>
      </div>
    </div>,
    { ...size },
  );
}
