import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'


const PositioningIcon = (): ReactElement => {

    const theme = useTheme()
    const color =  theme.palette.icon.primary 
   
    return(
        <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6025 18.3334 10.0001C18.3334 5.39771 14.6025 1.66675 10.0001 1.66675C5.39771 1.66675 1.66675 5.39771 1.66675 10.0001C1.66675 14.6025 5.39771 18.3334 10.0001 18.3334Z" 
                stroke={color} 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
            <path 
                d="M1.66675 10H18.3334" 
                stroke={color} 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
            <path d="M10.0001 1.66675C12.0845 3.94871 13.269 6.91011 13.3334 10.0001C13.269 13.0901 12.0845 16.0515 10.0001 18.3334C7.91568 16.0515 6.73112 13.0901 6.66675 10.0001C6.73112 6.91011 7.91568 3.94871 10.0001 1.66675V1.66675Z" 
                stroke={color}
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
        </svg>

    )
}
export default PositioningIcon;