import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'


const POISettingsIcon = (): ReactElement => {

    const theme = useTheme()
    const color =  theme.palette.icon.primary 

    return(
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <g 
                clipPath="url(#clip0_2516_14583)">
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M9.07162 1.28483L9.60195 1.81517C10.6054 2.81864 10.9223 4.2269 10.695 5.59876L13.7678 8.67159C16.2666 7.96215 19.0674 8.59016 21.0365 10.5592L21.5669 11.0896L11.0895 21.567L10.5591 21.0367C8.59006 19.0676 7.96201 16.2668 8.67144 13.768L5.59857 10.6951C4.22673 10.9225 2.8185 10.6055 1.81505 9.60207L1.2847 9.07174L9.07162 1.28483ZM3.49361 8.98415C4.09764 9.28477 4.85454 9.35256 5.66174 9.15134L6.07346 9.0487L10.3902 13.3654L10.2312 13.812C9.56957 15.6712 9.86777 17.7933 11.1228 19.4123L19.4122 11.1229C17.7932 9.86791 15.6711 9.56971 13.8118 10.2314L13.3652 10.3903L9.04856 6.07364L9.1512 5.66192C9.35244 4.8547 9.28465 4.09777 8.98403 3.49374L3.49361 8.98415Z" 
                    fill={color}/>
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M15.2675 15.2676C15.5604 14.9747 16.0353 14.9747 16.3282 15.2676L20.3639 19.3034C20.6568 19.5963 20.6568 20.0711 20.3639 20.364C20.071 20.6569 19.5962 20.6569 19.3033 20.364L15.2675 16.3283C14.9746 16.0354 14.9746 15.5605 15.2675 15.2676Z" 
                    fill={color}/>
            </g>
            <defs>
                <clipPath 
                    id="clip0_2516_14583">
                <rect 
                    width="24" 
                    height="24" 
                    fill={color}/>
                </clipPath>
            </defs>
        </svg>

    )
}
export default POISettingsIcon;