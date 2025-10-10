import { useImperativeHandle, useState } from 'react';
import HMAModalTemplate, { HMAModalTemplateProps } from '.';

export type infoModalRefProps = {
  showToast?: (arg?: { message?: string }) => void;
};
export interface HMAInfoModalProps {
  ref?: React.RefObject<infoModalRefProps | null>;
  variant?: HMAModalTemplateProps['variant'];
  title?: string;
  description?: string;
}

export default function HMAErrorModal({
  ref,
  variant = 'error',
  title = 'Oops!',
  description,
}: HMAInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [descriptionTxtx, setDescriptionTxt] = useState(
    'Something went wrong..',
  );

  useImperativeHandle(ref, () => ({
    showToast: arg => {
      setIsOpen(true);
      if (arg?.message) setDescriptionTxt(arg?.message);
    },
  }));

  return (
    <HMAModalTemplate
      variant={variant}
      isVisible
      cancelTextProps={{ children: null }}
      descriptionProps={{
        children: description,
      }}
    />
  );
}
