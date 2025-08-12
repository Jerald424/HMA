import { useTheme } from 'src/hooks/useTheme';
import HMAModalOrganism, { HMAModalOrganismProps } from '../../organism/modal';

export interface HMAModalTemplateProps extends HMAModalOrganismProps {
  variant?: 'info' | 'warning' | 'error';
}

export default function HMAModalTemplate({
  variant = 'info',
  ...props
}: HMAModalTemplateProps) {
  const { colors, spacing } = useTheme();
  const variantMapping = {
    info: {
      icon: require('src/assets/color-icons/information.png'),
      heading: 'Are you sure?',
      description:
        "This action can't be undone. Please confirm if you want to proceed.",
    },
    warning: {
      // icon:require("src/assets/some.png"),
      heading: 'Are you sure?',
      description:
        "This action can't be undone. Please confirm if you want to proceed.",
    },
    error: {
      // icon:require("src/assets/some.png"),
      heading: 'Are you sure?',
      description:
        "This action can't be undone. Please confirm if you want to proceed.",
    },
  }[variant];
  return (
    <HMAModalOrganism
      avatarProps={{
        position: 'top',
        source: variantMapping?.icon,
      }}
      headingProps={{
        children: variantMapping.heading,
      }}
      descriptionProps={{
        children: variantMapping.description,
      }}
      {...props}
    />
  );
}
