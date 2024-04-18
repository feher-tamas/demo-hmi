import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'


const PathIcon = (): ReactElement => {

    const theme = useTheme()
    const color =  theme.palette.icon.primary 

    return(
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <circle 
                cx="19" 
                cy="5" r="2" 
                fill={color}/>
            <circle 
                cx="5" 
                cy="19" 
                r="2" 
                fill={color}/>
            <line 
                x1="5.46967" 
                y1="18.4697" 
                x2="18.4697" 
                y2="5.46967" 
                stroke={color}
                strokeWidth="1.5"/>
        </svg>
    )
}
export default PathIcon;