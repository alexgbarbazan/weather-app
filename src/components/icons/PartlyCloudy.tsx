export default function PartlyCloudy({style}: {style: React.CSSProperties}){
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        style={style}
      >
        <defs>
          <symbol id="d" viewBox="0 0 196 196">
            <circle
              cx="98"
              cy="98"
              r="40"
              fill="url(#b)"
              stroke="#f8af18"
              stroke-miterlimit="10"
              stroke-width="4"
            />
            <path
              fill="none"
              stroke="#fbbf24"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="12"
              d="M98 31.4V6m0 184v-25.4M145.1 51l18-17.9M33 163l18-17.9M51 51 33 33m130.1 130.1-18-18M6 98h25.4M190 98h-25.4"
            >
              <animateTransform
                additive="sum"
                attributeName="transform"
                dur="2s"
                repeatCount="indefinite"
                type="rotate"
                values="0 98 98; 45 98 98"
              />
            </path>
          </symbol>
          <symbol id="e" viewBox="0 0 350 222">
            <path
              fill="url(#a)"
              stroke="#e6effc"
              stroke-miterlimit="10"
              stroke-width="6"
              d="m291 107-2.5.1A83.9 83.9 0 00135.6 43 56 56 0 0051 91a56.6 56.6 0 00.8 9A60 60 0 0063 219l4-.2v.2h224a56 56 0 000-112Z"
            />
          </symbol>
          <symbol id="c" viewBox="0 0 363 258">
            <use xlinkHref="#d" width="196" height="196" />
            <use
              xlinkHref="#e"
              width="350"
              height="222"
              transform="translate(13 36)"
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
            <stop offset="0" stop-color="#f3f7fe" />
            <stop offset=".5" stop-color="#f3f7fe" />
            <stop offset="1" stop-color="#deeafb" />
          </linearGradient>
          <linearGradient
            id="b"
            x1="78"
            x2="118"
            y1="63.4"
            y2="132.7"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#fbbf24" />
            <stop offset=".5" stop-color="#fbbf24" />
            <stop offset="1" stop-color="#f59e0b" />
          </linearGradient>
        </defs>
        <use
          xlinkHref="#c"
          width="363"
          height="258"
          transform="translate(68 109)"
        />
      </svg>
    );
}