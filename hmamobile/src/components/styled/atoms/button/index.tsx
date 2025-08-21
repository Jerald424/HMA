import {
  Pressable,
  PressableProps,
  TouchableHighlight,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from 'src/theme/colors';
import { iconType } from '../icon/icon';
import HMAIcon, { HMAIconProps } from '../icon';
import HMAText from '../text';
import { cStyle } from 'src/utils/style';
import { useTheme } from 'src/hooks/useTheme';
import { withOpacity } from 'src/utils/withOpacity';

export interface HMAButtonProps extends PressableProps {
  title?: string;
  /**
   * @default md
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * @default solid
   */
  variant?: 'solid' | 'outline' | 'ghost';
  /**
   * @default primary
   */
  color?: keyof typeof colors;
  loading?: boolean;
  leftIcon?: iconType;
  leftIconProps?: HMAIconProps;
  rightIcon?: iconType;
  rightIconProps?: HMAIconProps;
}

export default function HMAButton({
  title,
  leftIcon,
  rightIcon,
  leftIconProps,
  rightIconProps,
  size = 'md',
  ...props
}: HMAButtonProps) {
  const { spacing, metrics } = useTheme();

  const sizeMap = {
    sm: 10,
    md: 14,
    lg: 18,
  }[size];

  const pressedBg = withOpacity(colors.primary, 0.1); // 10% visible overlay

  return (
    <Pressable
      style={({ pressed }) => [
        {
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 8,
          backgroundColor: pressed ? pressedBg : 'transparent',
        },
      ]}
    >
      <HMAText color="primary">Ghost Button</HMAText>
    </Pressable>
  );

  return (
    <Pressable
      {...props}
      style={[
        {
          backgroundColor: 'red',
          borderRadius: metrics.radius.sm,
          padding: sizeMap,
        },
        cStyle.rowAlign,
      ]}
    >
      {leftIcon && <HMAIcon name={leftIcon} size="xs" {...leftIconProps} />}
      {title && (
        <HMAText style={{ flex: 1, textAlign: 'center' }}>{title}</HMAText>
      )}
      {rightIcon && <HMAIcon name={rightIcon} size="xs" {...rightIconProps} />}
    </Pressable>
  );
}
