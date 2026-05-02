import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import HMABadge from 'src/components/styled/atoms/badge';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { amtFormat } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';

export default function PayslipDetail({ navigation, route }) {
  const params = route?.params;
  const { colors, spacing, metrics } = useTheme();

  const salary_breakdown = useMemo(() => {
    const bd = Object.values(params?.salary_breakdown);
    bd.push({
      name: 'Total Deductions',
      amount: params?.total_deductions,
    });
    return bd;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: params?.payslip_name,
    });
  }, []);
  return (
    <Container>
      <HMACard style={{ padding: spacing.sm }}>
        <HMAText variant="title">
          {params?.date_from} TO {params?.date_to}
        </HMAText>
        <HMADivider thickness={1} />
        {salary_breakdown?.map(salary => (
          <View key={salary?.name} style={[cStyle.rowAlign]}>
            <HMAText align="right" style={{ flex: 1 }}>
              {salary?.name}
            </HMAText>
            <HMAText
              align="right"
              size="large"
              color="success"
              style={{ width: 100 }}
            >
              {amtFormat(salary?.amount)}
            </HMAText>
          </View>
        ))}
        <HMADivider thickness={1} />
        <HMABadge
          color="primary"
          textProps={{ style: { textTransform: 'capitalize' } }}
          label={params?.status}
          style={{ alignSelf: 'flex-end' }}
        />
      </HMACard>
    </Container>
  );
}
