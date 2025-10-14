import { useImperativeHandle, useState } from 'react';
import HMAModalTemplate, { HMAModalTemplateProps } from '.';

export type alertRefProp = {
  showAlert?: (arg?: {
    message?: string;
    variant?: HMAModalTemplateProps['variant'];
    title?: string;
  }) => void;
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
  const [variantState, setVariantState] = useState(variant);
  const [titleState, setTitleState] = useState(title);

  useImperativeHandle(ref, () => ({
    showAlert: arg => {
      setIsOpen(true);
      if (arg?.message) setDescriptionTxt(arg?.message);
      if (arg?.variant) setVariantState(arg?.variant);
      if (arg?.title) setTitleState(arg?.title);
    },
  }));

  return (
    <HMAModalTemplate
      variant={variantState}
      isVisible={isOpen}
      headingProps={{
        children: titleState,
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
