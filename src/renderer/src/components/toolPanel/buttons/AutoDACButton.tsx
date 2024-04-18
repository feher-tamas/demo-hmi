import { ReactElement } from "react";
import SquareButton from '@renderer/ui/SquareButton';
import AutoDACIcon from "./icons/AutoDACIcon";

const AutoDACButton = (): ReactElement => {

    return(
        <SquareButton>
            <AutoDACIcon />
        </SquareButton>

    )
}
export default AutoDACButton;