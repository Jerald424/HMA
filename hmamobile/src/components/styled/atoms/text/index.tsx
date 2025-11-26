import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { colors } from 'src/theme/colors';
import { typography } from 'src/theme/typography';
import fonts from 'src/utils/fonts';
// import { useTheme } from '../../../../hooks/useTheme';

export interface HMATextProps extends TextProps {
  /**
    @default regular
    */
  size?: keyof typeof typography;
  /**
   * @default textPrimary
   */
  color?: keyof typeof colors;
  align?: TextStyle['textAlign'];
  variant?: keyof typeof fonts;
}

export default function HMAText({
  size = 'regular',
  color = 'textPrimary',
  variant,
  align,
  ...props
}: HMATextProps) {
  const { typography, colors } = useTheme();

  const fontFamily = fonts[variant ?? size];

  const style = {
    ...typography?.[size],
    color: colors[color],
    textAlign: align,
    fontFamily,
  } as TextProps['style'];

  return (
    <Text allowFontScaling={false} {...props} style={[style, props?.style]} />
  );
}
