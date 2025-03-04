export default function Overcast({style}: {style?: React.CSSProperties})  {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      style={style}
    >
      <defs>
        <symbol id="e" viewBox="0 0 196 196">
          <circle
            cx="98"
            cy="98"
            r="40"
            fill="url(#c)"
            stroke="#f8af18"
            strokeMiterlimit="10"
            strokeWidth="4"
          />
          <path
            fill="none"
            stroke="#fbbf24"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="12"
            d="M98 31.4V6m0 184v-25.4M145.1 51l18-17.9M33 163l18-17.9M51 51 33 33m130.1 130.1-18-18M6 98h25.4M190 98h-25.4"
          >
            <animateTransform
              additive="sum"
              attributeName="transform"
              dur="6s"
              repeatCount="indefinite"
              type="rotate"
              values="0 98 98; 90 98 98; 0 98 98"
            />
          </path>
        </symbol>
        <symbol id="g" viewBox="0 0 200.3 126.1">
          <path
            fill="url(#b)"
            stroke="#848b98"
            strokeMiterlimit="10"
            d="M.5 93.2a32.4 32.4 0 0032.4 32.4h129.8v-.1l2.3.1a34.8 34.8 0 006.5-68.9 32.4 32.4 0 00-48.5-33 48.6 48.6 0 00-88.6 37.1h-1.5A32.4 32.4 0 00.5 93.1Z"
          />
        </symbol>
        <symbol id="h" viewBox="0 0 350 222">
          <path
            fill="url(#a)"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="6"
            d="m291 107-2.5.1A83.9 83.9 0 00135.6 43 56 56 0 0051 91a56.6 56.6 0 00.8 9A60 60 0 0063 219l4-.2v.2h224a56 56 0 000-112Z"
          />
        </symbol>
        <symbol id="f" overflow="visible" viewBox="0 0 398 222">
          <use
            xlinkHref="#g"
            width="200.3"
            height="126.1"
            transform="translate(198 27)"
          >
            <animateTransform
              additive="sum"
              attributeName="transform"
              dur="6s"
              repeatCount="indefinite"
              type="translate"
              values="-30 0; 30 0; -30 0"
            />
          </use>
          <use
            xlinkHref="#h"
            width="350"
            height="222"
          >
            <animateTransform
              additive="sum"
              attributeName="transform"
              dur="2s"
              repeatCount="indefinite"
              type="translate"
              values="-30 0; 30 0; -30 0"
            />
          </use>
        </symbol>
        <symbol id="d" overflow="visible" viewBox="0 0 410.8 258">
          <use xlinkHref="#e" width="196" height="196" />
          <use
            xlinkHref="#f"
            width="398"
            height="222"
            transform="translate(12.84 36)"
          />
        </symbol>
        <linearGradient
          id="a"
          x1="99.5"
          x2="232.6"
          y1="30.7"
          y2="261.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f3f7fe" />
          <stop offset="0.5" stopColor="#f3f7fe" />
          <stop offset="1" stopColor="#deeafb" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="52.7"
          x2="133.4"
          y1="9.6"
          y2="149.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#9ca3af" />
          <stop offset="0.5" stopColor="#9ca3af" />
          <stop offset="1" stopColor="#6b7280" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="78"
          x2="118"
          y1="63.4"
          y2="132.7"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <use
        xlinkHref="#d"
        width="410.8"
        height="258"
        transform="translate(56 109)"
      />
    </svg>
  );
}

  