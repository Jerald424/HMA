import { useTheme } from 'src/hooks/useTheme';
import HMATextInput, { HMATextInputProps } from '../../atoms/input';

export interface HMATextInputMoleculeProps extends HMATextInputProps {}

export default function HMATextInputMolecule({
  ...props
}: HMATextInputMoleculeProps) {
  const { colors, metrics, spacing } = useTheme();
  return (
    <HMATextInput
      {...props}
      style={[
        {
          backgroundColor: colors.lightBackground,
          paddingHorizontal: spacing.sm,
          paddingTop: spacing.md,
          paddingBottom: spacing.md,
          borderRadius: metrics.radius.md,
        },
        props?.style,
      ]}
    />
  );
}
