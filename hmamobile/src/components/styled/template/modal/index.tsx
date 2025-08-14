import { useTheme } from 'src/hooks/useTheme';
import HMAModalOrganism, { HMAModalOrganismProps } from '../../organism/modal';

export interface HMAModalTemplateProps extends HMAModalOrganismProps {
  variant?: 'info' | 'warning' | 'error';
}

export default function HMAModalTemplate({
  variant = 'info',
  ...props
}: HMAModalTemplateProps) {
  const { colors } = useTheme();

  const variantMapping = {
    info: {
      icon: require('src/assets/color-icons/information.png'),
      heading: 'Are you sure?',
      description:
        "This action can't be undone. Please confirm if you want to proceed.",
      btn: {
        color: {
          ok: 'info',
        },
      },
    },
    warning: {
      icon: require('src/assets/color-icons/warning.png'),
      heading: 'Are you sure?',
      description:
        "This action can't be undone. Please confirm if you want to proceed.",
      btn: {
        color: {
          ok: 'warning',
        },
      },
    },
    error: {
      icon: require('src/assets/color-icons/error.png'),
      heading: 'Are you sure?',
      description:
        "This action can't be undone. Please confirm if you want to proceed.",
      btn: {
        color: {
          ok: 'error',
        },
      },
    },
  }[variant];

  return (
    <HMAModalOrganism
      {...props}
      avatarProps={{
        position: 'top',
        source: variantMapping?.icon,
        ...props?.avatarProps,
      }}
      headingProps={{
        children: variantMapping.heading,
        ...props?.headingProps,
      }}
      descriptionProps={{
        children: variantMapping.description,
        ...props?.descriptionProps,
      }}
      cancelTextProps={{
        children: 'Cancel',
        ...props?.cancelTextProps,
      }}
      okTextProps={{
        children: 'Ok',
        color: variantMapping?.btn?.color?.ok as keyof typeof colors,
        ...props?.okTextProps,
      }}
    />
  );
}
