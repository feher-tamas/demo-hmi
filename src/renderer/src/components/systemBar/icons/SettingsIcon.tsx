import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'

const SettingsIcon = (): ReactElement => {
  const theme = useTheme()
  const borderColor =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary

  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5Z"
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.7 7.5C9.63344 7.65081 9.61359 7.8181 9.643 7.98029C9.67241 8.14249 9.74973 8.29216 9.865 8.41L9.895 8.44C9.98798 8.53287 10.0617 8.64316 10.1121 8.76456C10.1624 8.88596 10.1883 9.01608 10.1883 9.1475C10.1883 9.27892 10.1624 9.40904 10.1121 9.53044C10.0617 9.65184 9.98798 9.76213 9.895 9.855C9.80213 9.94798 9.69184 10.0217 9.57044 10.0721C9.44904 10.1224 9.31892 10.1483 9.1875 10.1483C9.05608 10.1483 8.92596 10.1224 8.80456 10.0721C8.68316 10.0217 8.57287 9.94798 8.48 9.855L8.45 9.825C8.33216 9.70973 8.18249 9.63241 8.02029 9.603C7.8581 9.57359 7.69081 9.59344 7.54 9.66C7.39212 9.72338 7.26599 9.82862 7.17715 9.96277C7.08832 10.0969 7.04064 10.2541 7.04 10.415V10.5C7.04 10.7652 6.93464 11.0196 6.74711 11.2071C6.55957 11.3946 6.30522 11.5 6.04 11.5C5.77478 11.5 5.52043 11.3946 5.33289 11.2071C5.14536 11.0196 5.04 10.7652 5.04 10.5V10.455C5.03613 10.2895 4.98256 10.129 4.88626 9.99435C4.78995 9.8597 4.65537 9.75714 4.5 9.7C4.34919 9.63344 4.1819 9.61359 4.01971 9.643C3.85751 9.67241 3.70784 9.74973 3.59 9.865L3.56 9.895C3.46713 9.98798 3.35684 10.0617 3.23544 10.1121C3.11404 10.1624 2.98392 10.1883 2.8525 10.1883C2.72108 10.1883 2.59096 10.1624 2.46956 10.1121C2.34816 10.0617 2.23787 9.98798 2.145 9.895C2.05202 9.80213 1.97826 9.69184 1.92794 9.57044C1.87762 9.44904 1.85171 9.31892 1.85171 9.1875C1.85171 9.05608 1.87762 8.92596 1.92794 8.80456C1.97826 8.68316 2.05202 8.57287 2.145 8.48L2.175 8.45C2.29027 8.33216 2.36759 8.18249 2.397 8.02029C2.42641 7.8581 2.40656 7.69081 2.34 7.54C2.27662 7.39212 2.17138 7.26599 2.03723 7.17715C1.90309 7.08832 1.74589 7.04064 1.585 7.04H1.5C1.23478 7.04 0.98043 6.93464 0.792893 6.74711C0.605357 6.55957 0.5 6.30522 0.5 6.04C0.5 5.77478 0.605357 5.52043 0.792893 5.33289C0.98043 5.14536 1.23478 5.04 1.5 5.04H1.545C1.7105 5.03613 1.871 4.98256 2.00565 4.88626C2.1403 4.78995 2.24286 4.65537 2.3 4.5C2.36656 4.34919 2.38641 4.1819 2.357 4.01971C2.32759 3.85751 2.25027 3.70784 2.135 3.59L2.105 3.56C2.01202 3.46713 1.93826 3.35684 1.88794 3.23544C1.83762 3.11404 1.81171 2.98392 1.81171 2.8525C1.81171 2.72108 1.83762 2.59096 1.88794 2.46956C1.93826 2.34816 2.01202 2.23787 2.105 2.145C2.19787 2.05202 2.30816 1.97826 2.42956 1.92794C2.55096 1.87762 2.68108 1.85171 2.8125 1.85171C2.94392 1.85171 3.07404 1.87762 3.19544 1.92794C3.31684 1.97826 3.42713 2.05202 3.52 2.145L3.55 2.175C3.66784 2.29027 3.81751 2.36759 3.97971 2.397C4.1419 2.42641 4.30919 2.40656 4.46 2.34H4.5C4.64788 2.27662 4.77401 2.17138 4.86285 2.03723C4.95168 1.90309 4.99936 1.74589 5 1.585V1.5C5 1.23478 5.10536 0.98043 5.29289 0.792893C5.48043 0.605357 5.73478 0.5 6 0.5C6.26522 0.5 6.51957 0.605357 6.70711 0.792893C6.89464 0.98043 7 1.23478 7 1.5V1.545C7.00064 1.70589 7.04832 1.86309 7.13715 1.99723C7.22599 2.13138 7.35212 2.23662 7.5 2.3C7.65081 2.36656 7.8181 2.38641 7.98029 2.357C8.14249 2.32759 8.29216 2.25027 8.41 2.135L8.44 2.105C8.53287 2.01202 8.64316 1.93826 8.76456 1.88794C8.88596 1.83762 9.01608 1.81171 9.1475 1.81171C9.27892 1.81171 9.40904 1.83762 9.53044 1.88794C9.65184 1.93826 9.76213 2.01202 9.855 2.105C9.94798 2.19787 10.0217 2.30816 10.0721 2.42956C10.1224 2.55096 10.1483 2.68108 10.1483 2.8125C10.1483 2.94392 10.1224 3.07404 10.0721 3.19544C10.0217 3.31684 9.94798 3.42713 9.855 3.52L9.825 3.55C9.70973 3.66784 9.63241 3.81751 9.603 3.97971C9.57359 4.1419 9.59344 4.30919 9.66 4.46V4.5C9.72338 4.64788 9.82862 4.77401 9.96277 4.86285C10.0969 4.95168 10.2541 4.99936 10.415 5H10.5C10.7652 5 11.0196 5.10536 11.2071 5.29289C11.3946 5.48043 11.5 5.73478 11.5 6C11.5 6.26522 11.3946 6.51957 11.2071 6.70711C11.0196 6.89464 10.7652 7 10.5 7H10.455C10.2941 7.00064 10.1369 7.04832 10.0028 7.13715C9.86862 7.22599 9.76338 7.35212 9.7 7.5V7.5Z"
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SettingsIcon