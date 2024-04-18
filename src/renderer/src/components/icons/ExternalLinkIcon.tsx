import { ReactElement } from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@mui/material/styles'

type Props = {
  inverse?: boolean
  large?: boolean
}

const ExternalLinkIcon = ({ inverse = false, large = false }: Props): ReactElement => {
  const theme = useTheme()
  const stroke =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary

  return (
    <ExternalLinkIconSvg
      inverse={inverse}
      large={large}
      width={large ? 20 : 24}
      height={large ? 20 : 24}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 6.5V9.5C9 9.76522 8.89464 10.0196 8.70711 10.2071C8.51957 10.3946 8.26522 10.5 8 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V4C1.5 3.73478 1.60536 3.48043 1.79289 3.29289C1.98043 3.10536 2.23478 3 2.5 3H5.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 1.5H10.5V4.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 7L10.5 1.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ExternalLinkIconSvg>
  )
}

const ExternalLinkIconSvg = styled.svg(({ inverse, large }: Props) => ({
  transform: inverse ? 'rotate(180deg)' : 'none',
  padding: large ? 2 : 4
}))

export default ExternalLinkIcon
