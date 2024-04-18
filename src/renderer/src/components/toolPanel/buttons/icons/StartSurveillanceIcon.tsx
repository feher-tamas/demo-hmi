import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'


const StartSurveillanceIcon = (): ReactElement => {
    const theme = useTheme()
    const color = theme.palette.icon.primary 
   

    return(
        <svg 
            width="39" 
            height="40" 
            viewBox="0 0 39 40" 
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect 
            width="40" 
            height="40" />
            <g clipPath="url(#clip0_694_13844)">
                <path d="M12.7937 13.3707C14.6984 11.7927 17.079 10.902 19.5517 10.8421C22.0245 10.7823 24.4453 11.5569 26.4241 13.041L20.1982 29.7043L12.7937 13.3707Z" 
                    fill={color}/>
            </g>
            <defs>
            <clipPath id="clip0_694_13844">
            <rect 
            width="20" 
            height="20" 
            fill={color} 
            transform="translate(10 10)"/>
            </clipPath>
            </defs>
        </svg>
    )
}
export default StartSurveillanceIcon;