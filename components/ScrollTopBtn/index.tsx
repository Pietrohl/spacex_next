import { useEffect, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import styles from '../../styles/Button.module.css'
import styles1 from '../../styles/ScrollTop.module.css'

type ButtonType = {
  classStyle?: string
}

const Button: React.FC<ButtonType> = ({ children, classStyle }) => {
  const [hidden, setHidden] = useState<boolean>(true)

  useEffect(() => {
    const onScroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setHidden(false)
      } else {
        setHidden(true)
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [hidden])

  const scrollToTop = () => {
    const body = document.body
    body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
  return (
    <div
      className={`${styles.Button} ${styles1.scrollTopBtn} ${classStyle} ${
        !hidden && styles1.scrollTopBtnShow
      } `}
      aria-hidden={hidden}
      onClick={() => scrollToTop()}
    >
      {children}
      <FaChevronUp />
    </div>
  )
}
export default Button
