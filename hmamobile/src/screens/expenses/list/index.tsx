import Container from 'src/components/styled/atoms/container';
import useExpenses from './useExpenses';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import NoData from 'src/components/layout/noData';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { cStyle } from 'src/utils/style';
import { useTheme } from 'src/hooks/useTheme';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { amountFormat, HAIRLINE_WIDTH } from 'src/utils/variables';
import HMABadge from 'src/components/styled/atoms/badge';
import HMAIcon from 'src/components/styled/atoms/icon';
import { withOpacity } from 'src/utils/withOpacity';

export default function ExpensesList({ navigation }) {
  const { expenses, isLoadingExpenses, refetch } = useExpenses();
  const { metrics, colors, spacing } = useTheme();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <Container backgroundColor="background">
      <FlatList
        style={{ borderRadius: metrics.radius.md }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          borderRadius: metrics.radius.md,
          borderWidth: HAIRLINE_WIDTH,
          borderColor: colors.border,
        }}
        refreshControl={
          <RefreshControl refreshing={isLoadingExpenses} onRefresh={refetch} />
        }
        data={expenses?.data}
        renderItem={({ item }) => <SepExp expense={item} />}
        ListEmptyComponent={
          isLoadingExpenses ? <></> : <NoData message="No expenses found !!" />
        }
        ItemSeparatorComponent={() => <HMADivider thickness={1} />}
      />
      <HMADivider />
      <HMAButton
        title="Create Expense"
        onPress={() => navigation?.navigate('Expense Detail')}
      />
    </Container>
  );
}

const SepExp = ({ expense }: { expense: any }) => {
  const { metrics, colors, spacing } = useTheme();
  const navigation = useNavigation();
  const statusColorMap =
    {
      draft: 'warning',
      rejected: 'error',
    }[expense?.state] ?? 'info';

  return (
    <>
      <View style={[cStyle.rowAlign, { padding: spacing.sm }]}>
        <View
          style={[
            {
              height: 40,
              width: 40,
              backgroundColor: withOpacity(colors.primary, 0.2),
              borderRadius: metrics?.radius.md,
            },
            cStyle.rowJustify,
          ]}
        >
          <HMAIcon name="box" variant=".primary" />
        </View>
        <HMADivider variant="vertical" space={'sm'} />
        <View style={{ flex: 1 }}>
          <HMAText variant="large">{expense?.name}</HMAText>
          <HMADivider />
          <HMAText size="small" color="textSecondary">
            {expense?.category}{' '}
          </HMAText>
        </View>
        <HMADivider variant="vertical" space={'sm'} />

        <View style={{}}>
          <HMAText variant="title">{amountFormat(expense?.amount)}</HMAText>
          <HMADivider />
          <HMABadge
            size="sm"
            textProps={{ style: { textTransform: 'capitalize' } }}
            label={expense?.state}
            color={statusColorMap}
          />
        </View>
        {expense?.state == 'draft' && (
          <>
            <HMADivider variant="vertical" space={'sm'} />

            <TouchableOpacity
              style={{}}
              onPress={() =>
                navigation?.navigate('Expense Detail', JSON.stringify(expense))
              }
              hitSlop={20}
            >
              <HMAIcon name="edit" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};
