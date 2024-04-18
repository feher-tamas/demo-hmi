import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'


const AutoDACIcon = (): ReactElement => {

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
                d="M9.26675 4.16663C9.26675 4.12819 9.24471 4.09315 9.21007 4.0765C9.17542 4.05984 9.1343 4.06453 9.10428 4.08854L4.965 7.39996H1.66675C1.61152 7.39996 1.56675 7.44473 1.56675 7.49996V12.5C1.56675 12.5552 1.61152 12.6 1.66675 12.6H4.965L9.10428 15.9114C9.1343 15.9354 9.17542 15.9401 9.21007 15.9234C9.24471 15.9068 9.26675 15.8717 9.26675 15.8333V4.16663Z" 
                fill={color} 
                stroke={color}
                strokeWidth="0.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
            <path 
                d="M15.8916 4.10828C17.4539 5.67101 18.3315 7.79024 18.3315 9.99994C18.3315 12.2096 17.4539 14.3289 15.8916 15.8916M12.95 7.04994C13.7311 7.83131 14.1699 8.89093 14.1699 9.99578C14.1699 11.1006 13.7311 12.1602 12.95 12.9416" 
                stroke={color} 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
            <path 
                d="M6.63013 5.16663H5.16724L4.78101 4.20618H2.72339L2.33032 5.16663H0.867432L2.96265 0.429321H4.54175L6.63013 5.16663ZM4.45288 3.38245L3.75903 1.65295L3.05835 3.38245H4.45288Z" 
                fill={color}/>
        </svg>

    )
}
export default AutoDACIcon;