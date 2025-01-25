export default function Clear({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      style={style}
    >
      <defs>
        <linearGradient
          id="a"
          x1="150"
          x2="234"
          y1="119.2"
          y2="264.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#fbbf24" />
          <stop offset=".5" stop-color="#fbbf24" />
          <stop offset="1" stop-color="#f59e0b" />
        </linearGradient>
        <symbol id="b" viewBox="0 0 384 384">
          <circle
            cx="192"
            cy="192"
            r="84"
            fill="url(#a)"
            stroke="#f8af18"
            stroke-miterlimit="10"
            stroke-width="6"
          />
          <path
            fill="none"
            stroke="#fbbf24"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="24"
            d="M192 61.7V12m0 360v-49.7m92.2-222.5 35-35M64.8 319.2l35.1-35.1m0-184.4-35-35m254.5 254.5-35.1-35.1M61.7 192H12m360 0h-49.7"
          >
            <animateTransform
              additive="sum"
              attributeName="transform"
              dur="6s"
              repeatCount="indefinite"
              type="rotate"
              values="0 192 192; 45 192 192"
            />
          </path>
        </symbol>
      </defs>
      <use
        xlinkHref="#b"
        width="384"
        height="384"
        transform="translate(64 64)"
      />
    </svg>
  );
}
