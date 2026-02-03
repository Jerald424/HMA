import { ReactNode } from 'react';
import { createModalStack, ModalProvider } from 'react-native-modalfy';
import Loader from './loader';
import { VerifyFaceModalFy } from 'src/components/layout/faceVerify';

const modalConfig = { Loader, FaceVerify: VerifyFaceModalFy };
const defaultOptions = { backdropOpacity: 0.6 };

const stack = createModalStack(modalConfig, defaultOptions);

export default function ModalfyProvider({ children }: { children: ReactNode }) {
  return <ModalProvider stack={stack}>{children}</ModalProvider>;
}
