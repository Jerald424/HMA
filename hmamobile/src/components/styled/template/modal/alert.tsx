import { useImperativeHandle, useState } from 'react';
import HMAModalTemplate, { HMAModalTemplateProps } from '.';

export type alertRefProp = {
  showAlert?: (arg?: { message?: string }) => void;
};
export interface HMAInfoModalProps {
  ref?: React.RefObject<alertRefProp | null>;
  variant?: HMAModalTemplateProps['variant'];
  title?: string;
  description?: string;
}

export default function HMAAlert({
  ref,
  variant = 'error',
  title = 'Oops!',
  description,
}: HMAInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [descriptionTxt, setDescriptionTxt] = useState(description);

  useImperativeHandle(ref, () => ({
    showAlert: arg => {
      setIsOpen(true);
      if (arg?.message) setDescriptionTxt(arg?.message);
    },
  }));

  return (
    <HMAModalTemplate
      variant={variant}
      isVisible={isOpen}
      headingProps={{
        children: title,
      }}
      cancelTextProps={{ children: null }}
      descriptionProps={{
        children: descriptionTxt,
      }}
      okTextProps={{
        onPress: () => setIsOpen(false),
      }}
    />
  );
}
