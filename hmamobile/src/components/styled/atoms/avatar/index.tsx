import { Image, ImageProps } from 'react-native';

export interface HMAAvatarProps extends ImageProps {
  /**
   * @default xs
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function HMAAvatar({ size = 'sm', ...props }: HMAAvatarProps) {
  const HW = {
    xs: {
      height: 20,
      width: 20,
    },
    sm: {
      height: 35,
      width: 35,
    },
    md: {
      height: 60,
      width: 60,
    },
    lg: {
      height: 100,
      width: 100,
    },

    xl: {
      height: 150,
      width: 150,
    },
  }[size];
  return (
    <Image
      {...props}
      style={[{ height: HW.height, width: HW.width }, props?.style]}
    />
  );
}
