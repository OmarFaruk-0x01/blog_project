
import Spin from '@icons/Spin';
import Button from '@ui/Button';
import Modal from '@ui/Modal';
import type { FC } from 'react';
import type { MessageDialogProps } from './MessageDialog.interface'

const MessageDialog: FC<MessageDialogProps> = ({ cancelText, message, okText, onAgree, onCancel, title, loading }) => {

    return (
        <Modal closeButton>
            <Modal.Header className='font-semibold text-lg'>{title}</Modal.Header>
            <Modal.Content >
                <p className='text-base text-gray-500 font-medium py-5'>{message}</p>
            </Modal.Content>
            <Modal.Actions className='flex items-center justify-end gap-2'>
                <Button variant='error' texture='outline' onClick={onCancel} >{cancelText}</Button>
                <Button variant='success' texture='solid' onClick={onAgree} startIcon={loading ? <Spin /> : undefined}>{okText}</Button>
            </Modal.Actions>
        </Modal>
    );
}


export default MessageDialog;
