import { useEffect, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import HMABadge from 'src/components/styled/atoms/badge';
import HMAButton from 'src/components/styled/atoms/button';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { amtFormat } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import Download from './Download';
import useDetailPayslip from './useDetailPayslip';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import PayslipDetailUI from './UI';

export default function PayslipDetail({ navigation, route }) {
  const params = route?.params;
  console.log('params: ', params);
  const { colors, spacing, metrics } = useTheme();
  const { data, isLoading } = useDetailPayslip(params);
  console.log('data: ', data);

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
    <Container padding={0}>
      {isLoading ? (
        <HMAModalLoader isVisible />
      ) : (
        <PayslipDetailUI data={data} />
      )}
    </Container>
  );
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
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
      </ScrollView>
      <HMADivider space="sm" />
      <Download payslip={params} />
      <HMAModalLoader isVisible={isLoading} />
    </Container>
  );
}
