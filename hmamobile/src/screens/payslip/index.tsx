import { FlatList, TouchableOpacity, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { amtFormat } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

export default function PayslipList({ navigation }) {
  const { data } = useUserInfo();
  const { colors, spacing, metrics } = useTheme();
  const latest_payslip = data?.result?.data?.payslip_info?.latest_payslip;

  return (
    <Container>
      <FlatList
        ListEmptyComponent={<NoData />}
        data={data?.result?.data?.payslip_info?.all_payslips}
        renderItem={({ item }) => (
          <>
            <HMACard
              style={{ padding: spacing.sm }}
              onPress={() => navigation.navigate('Payslip Detail', item)}
            >
              <HMAText variant="title">{item?.payslip_name}</HMAText>
              <HMADivider thickness={1} />
              <HMAText>{item?.period}</HMAText>
              <HMADivider thickness={0} />

              <View style={[cStyle.row, { alignItems: 'flex-end' }]}>
                <HMAText size="title" color="success" style={{ flex: 1 }}>
                  {amtFormat(latest_payslip?.gross_salary)}
                </HMAText>

                <HMAText>See Detail</HMAText>
              </View>
            </HMACard>
            <HMADivider thickness={0} space={'md'} />
          </>
        )}
      />
    </Container>
  );
}
