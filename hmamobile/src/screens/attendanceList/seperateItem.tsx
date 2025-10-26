import { useMemo } from 'react';
import { View } from 'react-native';
import HMABadge from 'src/components/styled/atoms/badge';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { convertUserTimeZone } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

export default function SeparateItem({ item }: { item: any }) {
  const { spacing } = useTheme();
  const { data } = useUserInfo();
  const dtHr = useMemo(
    () => ({
      in: convertUserTimeZone({
        date: item?.check_in,
        timeZone: data?.Timezone,
      }),
      out: convertUserTimeZone({
        date: item?.check_out,
        timeZone: data?.Timezone,
      }),
    }),
    [item],
  );
  return (
    <>
      <HMACard cmpType="View" style={{ padding: spacing?.sm }}>
        <View style={[cStyle.row]}>
          <View style={{ flex: 1 }}>
            <HMAText size="small">Check In</HMAText>
            <HMAText color="success">
              {dtHr?.in?.date} {dtHr?.in?.time}
            </HMAText>
          </View>
          <View style={{ flex: 1 }}>
            <HMAText size="small">Check Out</HMAText>
            <HMAText color="error">
              {dtHr?.out?.date} {dtHr?.out?.time}
            </HMAText>
          </View>
        </View>

        <HMADivider thickness={1} />
        <HMAText color="textSecondary" size="small">
          Project: {item?.project?.name}
        </HMAText>
        <HMADivider />
        <View style={cStyle.row}>
          <HMABadge
            size="sm"
            color="info"
            label={`Worked Hour: ${item?.['worked_hours'] || '-'}`}
          />
          <HMADivider variant="vertical" />

          <HMABadge
            size="sm"
            color="primary"
            label={`Overtime: ${item?.['overtime'] || '-'}`}
          />
        </View>
      </HMACard>
      <HMADivider />
    </>
  );
}
