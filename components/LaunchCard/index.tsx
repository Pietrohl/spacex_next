import { useEffect, useState } from 'react'
import Link from 'next/link'

type ElementType = {
  // eslint-disable-next-line camelcase
  mission_name: string
  id: string
  details: string
}

type PropType = {
  hidden: boolean
  className: string
  element: ElementType
}

enum MouseState {
  over,
  out
}

// eslint-disable-next-line react/jsx-key
export default function LaunchCard({
  element: { mission_name: missionName, details, id },
  className,
  hidden
}: PropType): JSX.Element {
  const [detailsLength, setDetailsLength] = useState<number>(56)
  const [mouse, setMouse] = useState<MouseState>(MouseState.out)

  const expand = () => {
    if (detailsLength < 80) {
      setDetailsLength(detailsLength + 1)
    }
  }
  const shrink = () => {
    if (detailsLength > 56) {
      setDetailsLength(detailsLength - 1)
    }
  }
  useEffect(() => {
    if (mouse === MouseState.out) {
      setTimeout(() => shrink(), 20)
    }

    if (mouse === MouseState.over) {
      setTimeout(() => expand(), 20)
    }
  }, [shrink, expand])
  return (
    <Link href={`/launches/${id}`}>
      <div
        className={className}
        hidden={hidden}
        aria-hidden={hidden}
        onMouseEnter={() => setMouse(MouseState.over)}
        onMouseLeave={() => setMouse(MouseState.out)}
      >
        <h3>{missionName} &rarr;</h3>
        <p>
          {details && details.length > detailsLength + 4
            ? `${details.substring(0, detailsLength)} ...`
            : details}
        </p>
      </div>
    </Link>
  )
}
