import { ReactElement } from "react";
import SquareButton from '@renderer/ui/SquareButton';
import StartSurveillanceIcon from "./icons/StartSurveillanceIcon";

const StartSurveillanceButton = (): ReactElement => {

    return(
        <SquareButton>
            <StartSurveillanceIcon />
        </SquareButton>
    )
}
export default StartSurveillanceButton;