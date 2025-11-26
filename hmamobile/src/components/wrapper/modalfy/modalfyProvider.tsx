import { ReactNode } from 'react';
import { createModalStack, ModalProvider } from 'react-native-modalfy';
import Loader from './loader';

const modalConfig = { Loader };
const defaultOptions = { backdropOpacity: 0.6 };

const stack = createModalStack(modalConfig, defaultOptions);

export default function ModalfyProvider({ children }: { children: ReactNode }) {
  return <ModalProvider stack={stack}>{children}</ModalProvider>;
}
