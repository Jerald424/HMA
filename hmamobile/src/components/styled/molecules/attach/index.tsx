import { View } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import HMAAttach, { HMAAttachProps } from '../../atoms/attach';

export interface HMAAttachMoleculeProps extends HMAAttachProps {}

export default function HMAAttachMolecule({
  ...props
}: HMAAttachMoleculeProps) {
  const { colors, metrics, spacing } = useTheme();

  return (
    <View style={{ position: 'relative', justifyContent: 'center' }}>
      <HMAAttach
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
    </View>
  );
}
