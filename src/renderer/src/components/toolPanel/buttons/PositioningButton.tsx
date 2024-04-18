import { ReactElement } from "react";
import SquareButton from '@renderer/ui/SquareButton';
import PositionongIcon from "./icons/PositioningIcon";

const PositioningButton = (): ReactElement => {

    return(
        <SquareButton>
            <PositionongIcon />
        </SquareButton>
    )
}
export default PositioningButton;