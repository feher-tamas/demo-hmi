import { ReactElement } from "react";
import SquareButton from '@renderer/ui/SquareButton';
import SpotWindowIcon from "./icons/SpotWindowIcon";

const SpotWindowButton = (): ReactElement => {

    return(

        <SquareButton>

            <SpotWindowIcon />

        </SquareButton>

    )
}
export default SpotWindowButton;