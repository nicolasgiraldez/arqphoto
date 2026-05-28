import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Right arc approximation */}
      <div
        style={{
          position: 'absolute',
          right: -60,
          top: '50%',
          width: 290,
          height: 290,
          borderRadius: '50%',
          border: '11px solid #ffffff',
          transform: 'translateY(-50%)',
        }}
      />
      {/* Left arc approximation */}
      <div
        style={{
          position: 'absolute',
          left: -26,
          top: '50%',
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: '11px solid #ffffff',
          transform: 'translateY(-50%)',
        }}
      />
      {/* Horizontal line on right edge */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          width: 30,
          height: 12,
          background: '#ffffff',
          transform: 'translateY(-50%)',
        }}
      />
      <span
        style={{
          color: '#ffffff',
          fontWeight: 700,
          fontSize: 80,
          letterSpacing: -3,
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1,
          marginLeft: -10,
        }}
      >
        Ng
      </span>
    </div>,
    { ...size }
  )
}
