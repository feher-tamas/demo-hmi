import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'


const PoligonIcon = (): ReactElement => {

    const theme = useTheme()
    const color =  theme.palette.icon.primary 
   

    return(
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M18.2789 14.794C18.2598 14.8607 18.2501 14.9298 18.25 14.9992C18.2499 15.1028 18.2369 15.2055 18.2117 15.305L4.19263 16.9534C4.08322 16.8608 3.99011 16.7497 3.91782 16.6246C3.82743 16.4682 3.77222 16.2944 3.75545 16.1155L8.48375 2.87544C8.53887 2.8945 8.58816 2.91261 8.62742 2.92749C8.65635 2.93845 8.67924 2.94742 8.69431 2.95341L8.71068 2.95998L8.71371 2.96121L8.71383 2.96126C8.71396 2.96132 8.7141 2.96137 8.71423 2.96143C8.72395 2.96543 8.73376 2.96924 8.74365 2.97283L19.6746 6.94853C19.8423 7.05608 19.9822 7.20236 20.0822 7.37541C20.1763 7.53826 20.2323 7.71989 20.2464 7.90667L18.2789 14.794Z" 
                stroke={color}
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
            <circle 
                cx="4" 
                cy="17" 
                r="2" 
                fill={color}/>
            <circle 
                cx="18" 
                cy="15" 
                r="2" 
                fill={color}/>
            <circle 
                cx="20" 
                cy="7" 
                r="2" 
                fill={color}/>
            <circle 
                cx="9" 
                cy="3" 
                r="2" 
                fill={color}/>
        </svg>
    )
}
export default PoligonIcon;