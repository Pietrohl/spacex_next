import styles from '../../styles/Button.module.css'

type ButtonType = {
  hidden?: boolean
  classStyle?: string
  onClick?: () => void
}

const Button: React.FC<ButtonType> = ({
  children,
  hidden = false,
  onClick,
  classStyle
}) => {
  return (
    <div
      className={`${styles.Button} ${classStyle}`}
      hidden={hidden}
      aria-hidden={hidden}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
export default Button
