import { useTheme } from '@mui/material'
import { ReactElement } from 'react'

type SettingsIconProps = {
  selected: boolean
}

const SettingsIcon = ({ selected }: SettingsIconProps): ReactElement => {
  const theme = useTheme()

  const getBorderColor = (selected: boolean): string => {
    if (theme.palette.mode === 'dark') {
      return selected
        ? theme.palette.settingsWindow.selected.color
        : theme.palette.settingsWindow.notSelected.color
    }
    return theme.palette.icon.primary
  }

  const borderColor = getBorderColor(selected)
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
        stroke={borderColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.1663 12.5C16.0554 12.7514 16.0223 13.0302 16.0713 13.3005C16.1204 13.5709 16.2492 13.8203 16.4413 14.0167L16.4913 14.0667C16.6463 14.2215 16.7692 14.4053 16.8531 14.6076C16.937 14.81 16.9802 15.0268 16.9802 15.2459C16.9802 15.4649 16.937 15.6818 16.8531 15.8841C16.7692 16.0864 16.6463 16.2702 16.4913 16.425C16.3366 16.58 16.1527 16.7029 15.9504 16.7868C15.7481 16.8707 15.5312 16.9139 15.3122 16.9139C15.0931 16.9139 14.8763 16.8707 14.6739 16.7868C14.4716 16.7029 14.2878 16.58 14.133 16.425L14.083 16.375C13.8866 16.1829 13.6372 16.0541 13.3668 16.005C13.0965 15.956 12.8177 15.9891 12.5663 16.1C12.3199 16.2057 12.1097 16.3811 11.9616 16.6047C11.8135 16.8282 11.7341 17.0902 11.733 17.3584V17.5C11.733 17.9421 11.5574 18.366 11.2449 18.6785C10.9323 18.9911 10.5084 19.1667 10.0663 19.1667C9.62431 19.1667 9.20039 18.9911 8.88783 18.6785C8.57527 18.366 8.39967 17.9421 8.39967 17.5V17.425C8.39322 17.1492 8.30394 16.8817 8.14343 16.6573C7.98293 16.4329 7.75862 16.2619 7.49967 16.1667C7.24833 16.0558 6.96951 16.0227 6.69918 16.0717C6.42885 16.1207 6.17941 16.2496 5.98301 16.4417L5.93301 16.4917C5.77822 16.6467 5.5944 16.7696 5.39207 16.8535C5.18974 16.9373 4.97287 16.9805 4.75384 16.9805C4.53481 16.9805 4.31794 16.9373 4.11561 16.8535C3.91328 16.7696 3.72946 16.6467 3.57467 16.4917C3.41971 16.3369 3.29678 16.1531 3.21291 15.9508C3.12903 15.7484 3.08586 15.5316 3.08586 15.3125C3.08586 15.0935 3.12903 14.8766 3.21291 14.6743C3.29678 14.472 3.41971 14.2882 3.57467 14.1334L3.62467 14.0834C3.81679 13.887 3.94566 13.6375 3.99468 13.3672C4.04369 13.0969 4.0106 12.8181 3.89967 12.5667C3.79404 12.3202 3.61864 12.11 3.39506 11.962C3.17149 11.8139 2.9095 11.7344 2.64134 11.7334H2.49967C2.05765 11.7334 1.63372 11.5578 1.32116 11.2452C1.0086 10.9327 0.833008 10.5087 0.833008 10.0667C0.833008 9.62468 1.0086 9.20076 1.32116 8.8882C1.63372 8.57563 2.05765 8.40004 2.49967 8.40004H2.57467C2.8505 8.39359 3.11801 8.30431 3.34242 8.1438C3.56684 7.98329 3.73777 7.75899 3.83301 7.50004C3.94394 7.24869 3.97703 6.96988 3.92801 6.69955C3.879 6.42922 3.75012 6.17977 3.55801 5.98337L3.50801 5.93337C3.35305 5.77858 3.23012 5.59477 3.14624 5.39244C3.06237 5.19011 3.0192 4.97323 3.0192 4.75421C3.0192 4.53518 3.06237 4.3183 3.14624 4.11597C3.23012 3.91364 3.35305 3.72983 3.50801 3.57504C3.6628 3.42008 3.84661 3.29715 4.04894 3.21327C4.25127 3.1294 4.46815 3.08623 4.68717 3.08623C4.9062 3.08623 5.12308 3.1294 5.32541 3.21327C5.52774 3.29715 5.71155 3.42008 5.86634 3.57504L5.91634 3.62504C6.11274 3.81715 6.36219 3.94603 6.63252 3.99504C6.90285 4.04406 7.18166 4.01097 7.43301 3.90004H7.49967C7.74615 3.7944 7.95635 3.619 8.10442 3.39543C8.25248 3.17185 8.33194 2.90986 8.33301 2.64171V2.50004C8.33301 2.05801 8.5086 1.63409 8.82116 1.32153C9.13372 1.00897 9.55765 0.833374 9.99967 0.833374C10.4417 0.833374 10.8656 1.00897 11.1782 1.32153C11.4907 1.63409 11.6663 2.05801 11.6663 2.50004V2.57504C11.6674 2.8432 11.7469 3.10519 11.8949 3.32876C12.043 3.55234 12.2532 3.72774 12.4997 3.83337C12.751 3.9443 13.0298 3.97739 13.3002 3.92838C13.5705 3.87936 13.8199 3.75049 14.0163 3.55837L14.0663 3.50837C14.2211 3.35341 14.4049 3.23048 14.6073 3.14661C14.8096 3.06273 15.0265 3.01956 15.2455 3.01956C15.4645 3.01956 15.6814 3.06273 15.8837 3.14661C16.0861 3.23048 16.2699 3.35341 16.4247 3.50837C16.5796 3.66316 16.7026 3.84698 16.7864 4.04931C16.8703 4.25164 16.9135 4.46851 16.9135 4.68754C16.9135 4.90657 16.8703 5.12344 16.7864 5.32577C16.7026 5.5281 16.5796 5.71192 16.4247 5.86671L16.3747 5.91671C16.1826 6.11311 16.0537 6.36255 16.0047 6.63288C15.9557 6.90321 15.9887 7.18203 16.0997 7.43337V7.50004C16.2053 7.74651 16.3807 7.95672 16.6043 8.10478C16.8279 8.25285 17.0899 8.3323 17.358 8.33337H17.4997C17.9417 8.33337 18.3656 8.50897 18.6782 8.82153C18.9907 9.13409 19.1663 9.55801 19.1663 10C19.1663 10.4421 18.9907 10.866 18.6782 11.1786C18.3656 11.4911 17.9417 11.6667 17.4997 11.6667H17.4247C17.1565 11.6678 16.8945 11.7472 16.671 11.8953C16.4474 12.0434 16.272 12.2536 16.1663 12.5V12.5Z"
        stroke={borderColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SettingsIcon
