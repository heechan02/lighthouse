import { Link } from 'react-router-dom'

interface LighthouseLogoProps {
  size?: number
  asLink?: boolean
}

function LogoContent({ size = 32 }: { size: number }) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Trapezoid body */}
        <polygon points="10,26 22,26 19,14 13,14" fill="#E89B4C" />
        {/* Lantern room */}
        <rect x="12" y="10" width="8" height="5" rx="1" fill="#C97D35" />
        {/* Beam rays */}
        <line x1="20" y1="11" x2="30" y2="7" stroke="#E89B4C" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
        <line x1="20" y1="12.5" x2="31" y2="12.5" stroke="#E89B4C" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
        <line x1="20" y1="14" x2="30" y2="18" stroke="#E89B4C" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
        {/* Base */}
        <rect x="8" y="26" width="16" height="2.5" rx="1" fill="#E89B4C" />
      </svg>
      <span className="font-semibold text-foreground" style={{ fontSize: size * 0.5 }}>
        Lighthouse
      </span>
    </div>
  )
}

export default function LighthouseLogo({ size = 32, asLink = false }: LighthouseLogoProps) {
  if (asLink) {
    return (
      <Link to="/" className="inline-flex items-center hover:opacity-80 transition-opacity">
        <LogoContent size={size} />
      </Link>
    )
  }
  return <LogoContent size={size} />
}
