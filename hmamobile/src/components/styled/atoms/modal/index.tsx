import Modal, { ModalProps } from 'react-native-modal';

interface HMAModal extends ModalProps {}

export default function HMAModal({ ...props }: HMAModal) {
  return <Modal {...props}></Modal>;
}
