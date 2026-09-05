import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { amtFormat } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { useAuth, useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';
import usePayslip from './usePayslip';

export default function PayslipList({ navigation }) {
  const { data, isLoading, refetch } = usePayslip();
  const { colors, spacing, metrics } = useTheme();

  return (
    <Container padding={0}>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isLoading} />
        }
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={isLoading ? <></> : <NoData />}
        data={data?.payslips}
        renderItem={({ item }) => (
          <>
            <HMACard
              style={{ padding: spacing.sm }}
              onPress={() => navigation.navigate('Payslip Detail', item)}
            >
              <HMAText variant="title">{item?.month}</HMAText>
              <HMADivider thickness={1} />
              <HMAText>
                {item?.period?.from} to {item?.period?.to}
              </HMAText>
              <HMADivider thickness={0} />

              <View style={[cStyle.row, { alignItems: 'flex-end' }]}>
                <HMAText size="title" color="success" style={{ flex: 1 }}>
                  <HMAText size="small" color="textSecondary">
                    {item?.currency}
                  </HMAText>{' '}
                  {item?.amount}
                </HMAText>

                <HMAText>See Detail</HMAText>
              </View>
            </HMACard>
            <HMADivider thickness={0} />
          </>
        )}
      />
    </Container>
  );
}
