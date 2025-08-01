import { Text, TextProps, TextStyle } from 'react-native';
import { typography } from '../../../../theme/typography';
import { colors } from '../../../../theme/colors';
import { useTheme } from 'src/hooks/useTheme';
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
}

export default function HMAText({
  size = 'regular',
  fontWeight,
  color = 'textPrimary',
  ...props
}: HMATextProps) {
  const { typography, colors } = useTheme();

  const style = {
    ...typography?.[size],
    fontWeight,
    color: colors[color],
  };

  return (
    <Text allowFontScaling={false} {...props} style={[style, props?.style]} />
  );
}
