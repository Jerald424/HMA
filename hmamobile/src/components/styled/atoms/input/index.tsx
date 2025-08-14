import { TextInput, TextInputProps, TextStyle } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { typography } from 'src/theme/typography';

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
          fontWeight: fontMapping?.fontWeight as TextStyle['fontWeight'],
        },
        props?.style,
      ]}
    />
  );
}
