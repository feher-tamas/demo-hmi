import { ReactElement } from "react";
import SquareButton from '@renderer/ui/SquareButton';
import GoToPositionIcon from "./icons/GoToPositionIcon";

const GoToPositionButton = (): ReactElement => {
  return (
    <SquareButton>
        <GoToPositionIcon />
    </SquareButton>
  )
}

export default GoToPositionButton;