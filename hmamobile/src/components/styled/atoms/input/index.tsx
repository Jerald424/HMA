import { Alert, TextInput, TextInputProps, TextStyle } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { typography } from 'src/theme/typography';
import fonts from 'src/utils/fonts';

export interface HMATextInputProps extends TextInputProps {
  /**
   * @default 'regular'
   */
  fontSize?: keyof typeof typography;
}

export default function HMATextInput({
  fontSize = 'regular',
  ...props
}: HMATextInputProps) {
  const { colors, typography } = useTheme();
  const fontFamily = fonts[fontSize];
  const fontMapping = typography?.[fontSize];

  return (
    <TextInput
      placeholderTextColor={colors.textSecondary}
      {...props}
      allowFontScaling={false}
      style={[
        {
          color: colors.textPrimary,
          fontSize: fontMapping?.fontSize,
          fontFamily,
        },
        props?.style,
      ]}
    />
  );
}
