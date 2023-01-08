
import Close from '@icons/Close';
import uiStore from '@store/uiStore';
import Button from '@ui/Button';
import clsx from 'clsx';
import { Children, cloneElement, FC, ReactElement } from 'react';
import type { ModalActionProps, ModalContentProps, ModalHeaderProps, ModalProps } from './Modal.interface'

const ModalActions = ({ children, className, ...props }: ModalActionProps) => {
    return <div {...props} className={clsx(className, 'p-3 border-t-[1px] border-gray-200')}>{children}</div>
}

const ModalHeader = ({ children, closeButton, className, ...props }: ModalHeaderProps) => {
    const closeDialog = uiStore(state => state.closeDialog)
    return <div className={clsx('p-3 border-b-[1px] border-gray-200', { 'flex items-center justify-between gap-2': closeButton })}>
        <h2 {...props} className={clsx(className, 'w-full')}>{children}</h2>
        <Button variant='normal' texture='ghost' className={clsx({ 'hidden': !closeButton })} onClick={closeDialog}>
            <Close />
        </Button>
    </div>
}

const ModalContent = ({ children }: ModalContentProps) => {
    return <div className='p-3'>{children}</div>
}

const Modal = ({ children, closeButton }: ModalProps) => {

    return (
        <div className='bg-white rounded min-w-[400px] font-siliguri'>
            {Children.map(children, child => cloneElement(child as ReactElement, { closeButton }))}
        </div>
    );
}

Modal.Actions = ModalActions as FC<Omit<ModalActionProps, 'closeButton'>>
Modal.Content = ModalContent as FC<Omit<ModalContentProps, ''>>
Modal.Header = ModalHeader as FC<Omit<ModalHeaderProps, 'closeButton'>>

export default Modal;
