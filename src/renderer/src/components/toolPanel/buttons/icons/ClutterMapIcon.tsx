import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'


const ClutterMapIcon = (): ReactElement => {

    const theme = useTheme()
    const color =  theme.palette.icon.primary 
   
    return(

        <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <g 
                clipPath="url(#clip0_2514_6505)">
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M5.69913 4.12607L10.7814 15.337L15.0506 3.91046C13.6324 3.06329 11.9978 2.62995 10.3339 2.6702C8.67655 2.71029 7.07114 3.21821 5.69913 4.12607ZM16.5666 3.42443C14.7633 2.07194 12.5571 1.36605 10.3036 1.42056C8.05013 1.47507 5.88064 2.2868 4.14482 3.72491L10.8928 18.6102L16.5666 3.42443Z" 
                    fill={color}/>
                <line 
                    x1="10.2559" 
                    y1="16.1422" 
                    x2="8.19799" 
                    y2="3.1373" 
                    stroke={color} 
                    strokeLinecap="round"/>
                <line 
                    x1="10.9337" 
                    y1="15.9822" 
                    x2="12.8801" 
                    y2="2.96024" 
                    stroke={color} 
                    strokeLinecap="round"/>
                <path 
                    d="M7.08325 7.91664C7.08325 7.91664 9.58325 6.66663 13.7499 7.91664" 
                    stroke={color}/>
            </g>
            <defs>
            <clipPath id="clip0_2514_6505">
                <rect 
                width="20" 
                height="20" fill={color}/>
            </clipPath>
            </defs>
        </svg>
    )
}
export default ClutterMapIcon;