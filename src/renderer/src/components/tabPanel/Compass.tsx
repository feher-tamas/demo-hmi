import { ReactElement } from 'react'
import styled from '@emotion/styled'

type Props = {
  rotate: number
}

const Compass = ({ rotate }: Props): ReactElement => {
  return (
    <Svg
      rotate={rotate}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="17" stroke="white" strokeWidth="2" />
      <path d="M18.5 8L24.1292 17.75H12.8708L18.5 8Z" fill="#FE1C1C" />
      <path d="M18.5 28L12.8708 18.25L24.1292 18.25L18.5 28Z" fill="white" />
    </Svg>
  )
}

export default Compass

const Svg = styled.svg`
  position: absolute;
  right: 10px;
  top: 10px;
  transform: ${({ rotate }: Props): string => `rotate(${rotate}deg);`};
  z-index: 500;
`
