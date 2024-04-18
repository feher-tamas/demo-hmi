import { ReactElement } from "react";
import SquareButton from '@renderer/ui/SquareButton';
import SurveillanceSettingsIcon from "./icons/SurveillanceSettingsIcon";

const SurveillanceSettingsButton = (): ReactElement => {

    return(

        <SquareButton>
            <SurveillanceSettingsIcon />
        </SquareButton>
    )
}
export default SurveillanceSettingsButton;