import { View } from 'react-native';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import HMAText from 'src/components/styled/atoms/text';
import { blendWithWhite } from 'src/function/colorCorrection';
import { useTheme } from 'src/hooks/useTheme';

export default function Status({
  status = 'success',
  heading = '',
  desc = '',
}: {
  status: 'error' | 'success';
  heading: string;
  desc: string;
}) {
  const { colors, spacing, metrics } = useTheme();

  return (
    <View
      style={{
        padding: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:
          status === 'error'
            ? blendWithWhite(colors.error, 0.8)
            : blendWithWhite(colors.success, 0.8),
        borderRadius: metrics.radius.md,
      }}
    >
      <HMAIcon
        name={status == 'error' ? 'location_cross' : 'maps_flag'}
        size="xs"
        variant={status === 'error' ? 'error' : 'success'}
      />
      <View style={{ flex: 1, marginLeft: spacing.md }}>
        <HMAText
          color={status === 'error' ? 'error' : 'success'}
          size="small"
          variant="title"
        >
          {heading}
        </HMAText>
        <HMAText color={status === 'error' ? 'error' : 'success'} size="small">
          {desc}
        </HMAText>
      </View>
    </View>
  );
}

//1.2km from office

// You're too far to check in
