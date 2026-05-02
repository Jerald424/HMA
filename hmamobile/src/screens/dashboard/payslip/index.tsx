import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { amtFormat } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

export default function PaySlip() {
  const { data } = useUserInfo();
  const navigation = useNavigation();

  const { colors, spacing, metrics } = useTheme();

  const latest_payslip = data?.result?.data?.payslip_info?.latest_payslip;
  if (!!latest_payslip)
    return (
      <HMACard
        onPress={() => navigation.navigate('Payslip')}
        style={{ padding: spacing.md, borderRadius: metrics.radius.lg }}
      >
        <HMAText color="textSecondary">{latest_payslip?.payslip_name}</HMAText>
        <HMADivider thickness={1} />
        <View style={[cStyle.row, { alignItems: 'flex-end' }]}>
          <HMAText size="title" color="success" style={{ flex: 1 }}>
            {amtFormat(latest_payslip?.gross_salary)}
          </HMAText>

          <HMAText>See More</HMAText>
        </View>
      </HMACard>
    );
}
