import { ReactElement } from "react";
import SquareButton from '@renderer/ui/SquareButton';
import ManualDACIcon from "./icons/ManualDACIcon";

const ManualDACButton = ():ReactElement => {

    return(
        <SquareButton>
            <ManualDACIcon />
        </SquareButton>
    )
}
export default ManualDACButton;