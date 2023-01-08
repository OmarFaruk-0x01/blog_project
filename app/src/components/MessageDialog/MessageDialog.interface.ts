import { ReactNode } from "react";

export type MessageDialogProps = {
    title: ReactNode;
    message: ReactNode;
    onCancel: () => void;
    onAgree: () => void;
    okText: string;
    cancelText: string;
    loading?: boolean
};