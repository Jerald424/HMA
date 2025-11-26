import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { colors } from 'src/theme/colors';
import HMAText, { HMATextProps } from '../text';
import { useTheme } from 'src/hooks/useTheme';
import { blendWithWhite } from 'src/function/colorCorrection';
import fonts from 'src/utils/fonts';

export interface HMABadgeProps extends ViewProps {
  label?: string | number;
  /**
   * @default md
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * @default error
   */
  color?: 'blank' | keyof typeof colors;
  /**
   * @default background
   */
  textColor?: keyof typeof colors;
  /**
   * @default inline
   */
  position?: 'top-right' | 'top-left' | 'inline';
  textProps?: HMATextProps;
}

export default function HMABadge({
  label,
  size = 'md',
  color = 'error',
  position = 'inline',
  textColor = 'background',
  textProps,
  ...props
}: HMABadgeProps) {
  const { colors, metrics } = useTheme();
  const sizeStyle: Record<typeof size, ViewStyle> = {
    sm: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 50 },
    md: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 50 },
    lg: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 50 },
  };
  const sizeMap = sizeStyle[size];

  const positionStyle: Record<typeof position, ViewStyle> = {
    'top-left': {
      position: 'absolute',
      left: -4,
      top: -4,
    },
    'top-right': {
      position: 'absolute',
      right: -4,
      top: -4,
    },
    inline: {
      alignSelf: 'flex-start',
    },
  };
  const positionMap = positionStyle[position];

  const textPropsForSize: Record<typeof size, HMATextProps> = {
    sm: {
      size: 'small',
    },
    lg: {
      size: 'regular',
    },
    md: {
      size: 'regular',
    },
  };
  const textPropsMap = textPropsForSize[size];

  if (!!label)
    return (
      <View
        {...props}
        style={[
          sizeMap,
          positionMap,
          color !== 'blank' && {
            backgroundColor: blendWithWhite(colors?.[color], 0.9),
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: blendWithWhite(colors?.[color], 0.6),
          },
          props?.style,
        ]}
      >
        <HMAText
          color={color}
          {...textPropsMap}
          {...textProps}
          style={[{ fontFamily: fonts.large }, textProps?.style]}
        >
          {label}
        </HMAText>
      </View>
    );
}
