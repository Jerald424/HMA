import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { colors } from 'src/theme/colors';
import { typography } from 'src/theme/typography';
// import { useTheme } from '../../../../hooks/useTheme';

interface HMATextProps extends TextProps {
  /**
    @default regular
    */
  size?: keyof typeof typography;
  fontWeight?: '200' | '400' | '600' | '800' | TextStyle['fontWeight'];
  /**
   * @default textPrimary
   */
  color?: keyof typeof colors;
  align?: TextStyle['textAlign'];
}

export default function HMAText({
  size = 'regular',
  fontWeight,
  color = 'textPrimary',
  align,
  ...props
}: HMATextProps) {
  const { typography, colors } = useTheme();

  const style = {
    ...typography?.[size],
    fontWeight,
    color: colors[color],
    textAlign: align,
  };

  return (
    <Text allowFontScaling={false} {...props} style={[style, props?.style]} />
  );
}
