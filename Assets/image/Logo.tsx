import * as React from 'react'

function SvgLoaderLogo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 107.972 40.825"
      width={60}
      height={60}
      {...props}
    >
      <defs>
        <path
          d="M15.173 11.565H3.622l-.627 1.193 12.828 9.35a128.83 128.83 0 017.95-4.24"
          id="loader_logo_svg__f"
        />
        <path
          d="M25.523 29.18l11.275 8.222H48.49l.484-1.09L32.138 23.99a132.104 132.104 0 00-6.615 5.19"
          id="loader_logo_svg__h"
        />
        <path
          d="M13.454 37.383H3.003L2.12 36C9.226 29.139 41.008-.272 110.092-3.423c0 0-57.986 1.956-96.638 40.806"
          id="loader_logo_svg__i"
        />
        <linearGradient id="loader_logo_svg__d" x1={0} y1="100%" x2={0} y2={0}>
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#e5e5e5" />
        </linearGradient>
        <linearGradient id="loader_logo_svg__a" x1={0} y1="100%" x2={0} y2={0}>
          <stop offset="0%" stopColor="#0070f3" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <pattern
          id="loader_logo_svg__g"
          x={0}
          y={0}
          width="150%"
          height="100%"
          patternUnits="userSpaceOnUse"
        >
          <rect
            y="100%"
            width="100%"
            height="100%"
            fill="url(#loader_logo_svg__a)"
          >
            <animate
              attributeType="XML"
              attributeName="y"
              from="100%"
              to="-100%"
              dur="0.5s"
              id="loader_logo_svg__c"
              begin="0s;b.end"
              repeatCount="indefinite"
            />
          </rect>
          <rect y="100%" width="100%" height="100%" fill="#e5e5e5">
            <animate
              attributeType="XML"
              attributeName="y"
              from="100%"
              to="-100%"
              dur="0.5s"
              id="loader_logo_svg__e"
              begin="c.begin + 0.25s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            y="100%"
            width="100%"
            height="100%"
            fill="url(#loader_logo_svg__d)"
          >
            <animate
              attributeType="XML"
              attributeName="y"
              from="100%"
              to="-100%"
              dur="0.5s"
              id="loader_logo_svg__b"
              begin="e.begin + 0.25s"
              repeatCount="indefinite"
            />
          </rect>
        </pattern>
      </defs>
      <use xlinkHref="#loader_logo_svg__f" fill="url(#loader_logo_svg__g)" />
      <use xlinkHref="#loader_logo_svg__h" fill="url(#loader_logo_svg__g)" />
      <use xlinkHref="#loader_logo_svg__i" fill="url(#loader_logo_svg__g)" />
    </svg>
  )
}

export default SvgLoaderLogo

