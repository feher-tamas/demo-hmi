import { ReactElement } from 'react';
import SquareButton from '@renderer/ui/SquareButton';
import ArtilleryModeIcon from "./icons/ArtilleryModeIcon";

const ArtilleryModeButton =  (): ReactElement  => {

    return(
        <SquareButton>

            <ArtilleryModeIcon />
            
        </SquareButton>
    )
    
}
export default ArtilleryModeButton;