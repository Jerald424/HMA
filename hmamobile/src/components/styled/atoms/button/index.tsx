import { Pressable, PressableProps, ViewStyle } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { colors } from 'src/theme/colors';
import { cStyle } from 'src/utils/style';
import { withOpacity } from 'src/utils/withOpacity';
import HMAIcon, { HMAIconProps } from '../icon';
import { iconType } from '../icon/icon';
import { HMATextInputProps } from '../input';
import HMAText, { HMATextProps } from '../text';

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
  color?: Exclude<keyof typeof colors, 'background' | 'lightBackground'>;
  // color?: keyof typeof colors;
  loading?: boolean;
  leftIcon?: iconType;
  leftIconProps?: HMAIconProps;
  rightIcon?: iconType;
  rightIconProps?: HMAIconProps;
  titleProps?: HMATextProps;
}

export default function HMAButton({
  title,
  leftIcon,
  rightIcon,
  leftIconProps,
  rightIconProps,
  size = 'md',
  variant = 'solid',
  color = 'primary',
  titleProps,
  ...props
}: HMAButtonProps) {
  const { metrics } = useTheme();

  const sizeMap = {
    sm: 10,
    md: 14,
    lg: 18,
  }[size];

  const reducedBg = withOpacity(colors[color], 0.1); // 10% visible overlay;

  const ghostStyle: PressableProps['style'] = ({ pressed }) => {
    return {
      backgroundColor: pressed ? reducedBg : 'transparent',
      color: colors[color],
    };
  };

  const solidStyle: PressableProps['style'] = () => ({
    backgroundColor: colors[color],
  });

  const outlineStyle: PressableProps['style'] = () => ({
    borderWidth: 2,
    borderColor: colors[color],
  });

  const pressabeStyleMap = {
    solid: solidStyle,
    outline: outlineStyle,
    ghost: ghostStyle,
  }[variant];

  const ghostTextStyle: HMATextInputProps['style'] = {
    color: colors[color],
  };

  const solidTextStyle: HMATextInputProps['style'] = {
    color: colors['background'],
  };
  const outlineTextStyle: HMATextInputProps['style'] = {
    color: colors[color],
  };

  const textStyleMap = {
    solid: solidTextStyle,
    outline: outlineTextStyle,
    ghost: ghostTextStyle,
  }[variant];

  const ghostIconStyle: HMAIconProps['style'] = {
    tintColor: colors[color],
  };

  const solidIconStyle: HMAIconProps['style'] = {
    tintColor: colors['background'],
  };
  const outlineIconStyle: HMAIconProps['style'] = {
    tintColor: colors[color],
  };

  const iconStyleMap = {
    solid: solidIconStyle,
    outline: outlineIconStyle,
    ghost: ghostIconStyle,
  }[variant];

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        pressabeStyleMap({ pressed }),
        {
          borderRadius: metrics.radius.sm,
          padding: sizeMap,
        },
        cStyle.rowJustify,
        props?.style as ViewStyle,
      ]}
    >
      {leftIcon && (
        <HMAIcon
          name={leftIcon}
          size="xs"
          {...leftIconProps}
          style={[iconStyleMap, leftIconProps?.style]}
        />
      )}
      {title && (
        <HMAText
          {...titleProps}
          style={[
            textStyleMap,
            { textAlign: 'center', marginHorizontal: 10 },
            titleProps?.style,
          ]}
        >
          {title}
        </HMAText>
      )}
      {rightIcon && (
        <HMAIcon
          name={rightIcon}
          size="xs"
          {...rightIconProps}
          style={[iconStyleMap, rightIconProps?.style]}
        />
      )}
    </Pressable>
  );
}
