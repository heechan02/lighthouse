interface FitScoreRingProps {
  score: number
  size?: number
}

export default function FitScoreRing({ score, size = 140 }: FitScoreRingProps) {
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const strokeColor =
    score >= 80 ? '#E89B4C' : score >= 60 ? '#F97316' : '#6B6560'

  const label =
    score >= 80 ? 'Strong match' : score >= 60 ? 'Good match' : 'Possible match'

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Fit score: ${score}%`}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E8E4DE"
          strokeWidth={strokeWidth}
        />
        {/* Foreground arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        {/* Score text */}
        <text
          x="50%"
          y="46%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="28"
          fontWeight="700"
          fill="#1A1A1A"
          fontFamily="Inter, system-ui, sans-serif"
        >
          {score}%
        </text>
        <text
          x="50%"
          y="64%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fill="#6B6560"
          fontFamily="Inter, system-ui, sans-serif"
        >
          match
        </text>
      </svg>
      <span className="text-sm font-medium" style={{ color: strokeColor }}>
        {label}
      </span>
    </div>
  )
}
