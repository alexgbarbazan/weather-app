export default function Rain({style}: {style: React.CSSProperties} ){
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
            x1="1381.3"
            x2="1399.5"
            y1="-1144.7"
            y2="-1097.4"
            gradientTransform="rotate(-9 8002.567 8233.063)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#0b65ed" />
            <stop offset=".5" stop-color="#0a5ad4" />
            <stop offset="1" stop-color="#0950bc" />
          </linearGradient>
          <linearGradient
            xlinkHref="#b"
            id="c"
            x1="1436.7"
            x2="1454.9"
            y1="-1137"
            y2="-1089.7"
            gradientTransform="rotate(-9 8009.537 8233.037)"
          />
          <linearGradient
            xlinkHref="#b"
            id="d"
            x1="1492.1"
            x2="1510.3"
            y1="-1129.3"
            y2="-1082.1"
            gradientTransform="rotate(-9 8016.566 8233.078)"
          />
          <symbol id="e" viewBox="0 0 350 222">
            <path
              fill="url(#a)"
              stroke="#e6effc"
              stroke-miterlimit="10"
              stroke-width="6"
              d="m291 107-2.5.1A83.9 83.9 0 00135.6 43 56 56 0 0051 91a56.6 56.6 0 00.8 9A60 60 0 0063 219l4-.2v.2h224a56 56 0 000-112Z"
            />
          </symbol>
          <symbol id="f" overflow="visible" viewBox="0 0 129 57">
            <path
              fill="url(#b)"
              stroke="#0a5ad4"
              stroke-miterlimit="10"
              d="M8.5 56.5a8 8 0 01-8-8v-40a8 8 0 0116 0v40a8 8 0 01-8 8Z"
              opacity="0"
            >
              <animateTransform
                id="x1"
                additive="sum"
                attributeName="transform"
                begin="0s; x1.end+.33s"
                dur=".67s"
                type="translate"
                values="0 -60; 0 60"
              />
              <animate
                id="y1"
                attributeName="opacity"
                begin="0s; y1.end+.33s"
                dur=".67s"
                keyTimes="0; .25; 1"
                values="0; 1; 0"
              />
            </path>
            <path
              fill="url(#c)"
              stroke="#0a5ad4"
              stroke-miterlimit="10"
              d="M64.5 56.5a8 8 0 01-8-8v-40a8 8 0 0116 0v40a8 8 0 01-8 8Z"
              opacity="0"
            >
              <animateTransform
                id="x2"
                additive="sum"
                attributeName="transform"
                begin=".33s; x2.end+.33s"
                dur=".67s"
                type="translate"
                values="0 -60; 0 60"
              />
              <animate
                id="y2"
                attributeName="opacity"
                begin=".33s; y2.end+.33s"
                dur=".67s"
                keyTimes="0; .25; 1"
                values="0; 1; 0"
              />
            </path>
            <path
              fill="url(#d)"
              stroke="#0a5ad4"
              stroke-miterlimit="10"
              d="M120.5 56.5a8 8 0 01-8-8v-40a8 8 0 0116 0v40a8 8 0 01-8 8Z"
              opacity="0"
            >
              <animateTransform
                id="x3"
                additive="sum"
                attributeName="transform"
                begin="-.33s; x3.end+.33s"
                dur=".67s"
                type="translate"
                values="0 -60; 0 60"
              />
              <animate
                id="y3"
                attributeName="opacity"
                begin="-.33s; y3.end+.33s"
                dur=".67s"
                keyTimes="0; .25; 1"
                values="0; 1; 0"
              />
            </path>
          </symbol>
        </defs>
        <use
          xlinkHref="#e"
          width="350"
          height="222"
          transform="translate(81 145)"
        />
        <use
          xlinkHref="#f"
          width="129"
          height="57"
          transform="translate(191.5 343.5)"
        />
      </svg>
    );
}