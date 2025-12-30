import { useMemo } from 'react';
import { View } from 'react-native';
import HMABadge from 'src/components/styled/atoms/badge';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import {  formateDate } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

export default function SeparateItem({ item }: { item: any }) {
  const { spacing } = useTheme();
  const { data } = useUserInfo();
  const dtHr = useMemo(
    () => ({
      in: formateDate(item?.check_in),
      out: formateDate(item?.check_out),
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
        {item?.overtime_status == 'approved' && (
          <HMABadge
            size="sm"
            color="primary"
            label={`Overtime: ${item?.['overtime'] || '-'}`}
          />
        )}

        {!!item?.auto_checkout_note && (
          <>
            <HMADivider thickness={1} />
            <HMAText size="small" variant="large">
              Auto Checkout Note:
            </HMAText>
            <HMAText>{item?.auto_checkout_note}</HMAText>
          </>
        )}
      </HMACard>
      <HMADivider />
    </>
  );
}
