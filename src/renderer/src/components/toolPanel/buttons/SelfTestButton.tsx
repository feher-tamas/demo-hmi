import SelfTestIcon from './icons/SelfTestIcon';
import SquareButton from '@renderer/ui/SquareButton';
import { ReactElement } from 'react';

const SelfTestButton = ():ReactElement => {
    return(
        <SquareButton>

            <SelfTestIcon />

        </SquareButton>
    )
}
export default SelfTestButton;