import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'


const CircleIcon = (): ReactElement => {

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
                d="M12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75Z" 
                stroke={color} 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
        </svg>
    )
}
export default CircleIcon;