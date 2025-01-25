export default function Cloudy({style}: {style?: React.CSSProperties})  {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      width="100%"
      height="100%"
    style={style}
    >
      <defs>
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
        <symbol id="b" viewBox="0 0 350 222">
          <path
            fill="url(#a)"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="6"
            d="m291 107-2.5.1A83.9 83.9 0 00135.6 43 56 56 0 0051 91a56.6 56.6 0 00.8 9A60 60 0 0063 219l4-.2v.2h224a56 56 0 000-112Z"
          />
        </symbol>
      </defs>
      <use
        xlinkHref="#b"
        width="350"
        height="222"
        transform="translate(81 145)"
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
    </svg>
  );
}
