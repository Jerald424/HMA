import { ScrollView, View } from 'react-native';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';

export default function LeaveInfo() {
  const { colors, spacing, metrics } = useTheme();
  const { data } = useUserInfo();

  return (
    <View>
      <HMADivider />

      <HMAText>Leave</HMAText>
      <HMADivider />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flexGrow: 0 }}
      >
        {[
          {
            label: 'Remaining',
            value: data?.result?.data?.leave_info?.total_remaining?.toFixed(1),
          },
          {
            label: 'Pending',
            value: data?.result?.data?.leave_info?.total_pending?.toFixed(1),
          },
          {
            label: 'Taken',
            value: data?.result?.data?.leave_info?.total_taken?.toFixed(1),
          },
          {
            label: 'Allocated',
            value: data?.result?.data?.leave_info?.total_allocated?.toFixed(1),
          },
        ].map(item => (
          <View
            key={item?.label}
            style={{
              paddingVertical: spacing.lg,
              backgroundColor: colors?.background,
              marginRight: spacing.lg,
              width: 100,
              borderRadius: metrics?.radius?.lg,
            }}
          >
            <HMAText color="textSecondary" size="regular" align="center">
              {item?.label}
            </HMAText>
            <HMAText size="title" align="center">
              {item?.value}
            </HMAText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
