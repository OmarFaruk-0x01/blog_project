import { DetailedHTMLProps, HTMLAttributes, ReactElement, ReactNode } from "react";

export type commonProps = {
    children: ReactElement[] | ReactElement | ReactNode
    closeButton?: boolean
}

export type ModalContentProps = commonProps & {

}

export type ModalHeaderProps = commonProps & DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {}

export type ModalActionProps = commonProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {}

export type ModalProps = commonProps & {

};