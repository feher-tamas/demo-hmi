import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'


const SpotWindowIcon = (): ReactElement => {

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
                clipPath="url(#clip0_2515_6961)">
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M5.69913 4.12607L10.7814 15.337L15.0506 3.91046C13.6324 3.06329 11.9978 2.62995 10.3339 2.6702C8.67655 2.71029 7.07114 3.21821 5.69913 4.12607ZM16.5666 3.42443C14.7633 2.07194 12.5571 1.36605 10.3036 1.42056C8.05013 1.47507 5.88064 2.2868 4.14482 3.72491L10.8928 18.6102L16.5666 3.42443Z" 
                    fill={color}/>
                <path 
                    d="M15.8334 15.8333C16.7539 15.8333 17.5001 15.0871 17.5001 14.1667C17.5001 13.2462 16.7539 12.5 15.8334 12.5C14.9129 12.5 14.1667 13.2462 14.1667 14.1667C14.1667 15.0871 14.9129 15.8333 15.8334 15.8333Z" 
                    stroke={color} 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
                <path 
                    d="M18.3333 16.6667L17.5 15.8334" 
                    stroke={color} 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_2515_6961">
                <rect 
                width="20" 
                height="20" 
                fill={color}/>
            </clipPath>
            </defs>
        </svg>

    )
}
export default SpotWindowIcon;