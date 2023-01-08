
import uiStore from '@store/uiStore';
import clsx from 'clsx';
import type { FC } from 'react';
import type { DialogProps } from './Dialog.interface'

const Dialog: FC<DialogProps> = () => {
    const dialog = uiStore(state => state.dialog);

    return (
        <div className={clsx('fixed left-1/2 top-1/2 -translate-x-[50%]  z-sidebar transition-all duration-500', {
            '-translate-y-[50%] visible opacity-100': Boolean(dialog),
            '-translate-y-[40%] invisible opacity-0 ': !Boolean(dialog)
        })}>
            {dialog?.children}
        </div>
    );
}


export default Dialog;
