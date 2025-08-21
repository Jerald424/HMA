import { Image, ImageProps } from 'react-native';
import { icons, iconType } from './icon';
import { colors } from 'src/theme/colors';

export interface HMAIconProps extends ImageProps {
  name: iconType;
  /**
   * @default sm
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * @default primary
   */
  variant?: keyof typeof colors;
}

export default function HMAIcon({
  size = 'sm',
  variant = 'primary',
  name,
  ...props
}: HMAIconProps) {
  const sizeMap = {
    //16 → 24 → 32 → 40 → 48
    xs: {
      height: 16,
      width: 16,
    },
    sm: {
      height: 24,
      width: 24,
    },
    md: {
      height: 32,
      width: 32,
    },
    lg: {
      height: 40,
      width: 40,
    },
    xl: {
      height: 48,
      width: 48,
    },
  }[size];
  return (
    <Image
      source={icons?.[name]}
      {...props}
      style={[
        {
          height: sizeMap.height,
          width: sizeMap.width,
          tintColor: colors?.[variant],
        },
        props?.style,
      ]}
    />
  );
}
