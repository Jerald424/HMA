import { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import NoData from 'src/components/layout/noData';
import HMABottomSheet from 'src/components/styled/atoms/bottomSheet';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import usePayslip from './usePayslip';
import { SCREEN_HEIGHT } from 'src/utils/variables';

export default function PayslipList({ navigation }) {
  const { data, isLoading, refetch } = usePayslip();
  const { colors, spacing, metrics } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const filterSheetRef = useRef<any>(null);

  const months = useMemo(
    () => Array.from(new Set((data?.payslips ?? []).map(item => item.month))),
    [data?.payslips],
  );
  const payslips = useMemo(
    () =>
      (data?.payslips ?? []).filter(
        item => !selectedMonth || item.month === selectedMonth,
      ),
    [data?.payslips, selectedMonth],
  );

  return (
    <Container padding={0}>
      <View
        style={[
          cStyle.row,
          {
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: spacing.md,
            paddingTop: spacing.md,
          },
        ]}
      >
        <HMAText variant="title">{selectedMonth || 'All payslips'}</HMAText>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Filter payslips by date"
          onPress={() => filterSheetRef.current?.open()}
          style={{
            borderColor: colors.border,
            borderRadius: metrics.radius.lg,
            borderWidth: 1,
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
          }}
        >
          <HMAText color="primary">
            {selectedMonth ? 'Change date' : 'Filter date'}
          </HMAText>
        </TouchableOpacity>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isLoading} />
        }
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={isLoading ? <></> : <NoData />}
        data={payslips}
        renderItem={({ item }) => (
          <>
            <HMACard
              style={{ padding: spacing.sm, borderRadius: metrics.radius.lg }}
              onPress={() => navigation.navigate('Payslip Detail', item)}
            >
              <HMAText variant="title">{item?.month}</HMAText>
              <HMAText size="small" color="success">
                {item?.status}
              </HMAText>
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
      <HMABottomSheet ref={filterSheetRef}>
        <View
          style={{
            backgroundColor: colors.background,
            padding: spacing.md,
          }}
        >
          <HMAText variant="title">Filter by date</HMAText>
          <HMADivider thickness={1} />
          <TouchableOpacity
            onPress={() => {
              setSelectedMonth(null);
              filterSheetRef.current?.close();
            }}
            style={{ paddingVertical: spacing.sm }}
          >
            <HMAText color={!selectedMonth ? 'primary' : undefined}>
              All dates
            </HMAText>
          </TouchableOpacity>
          <ScrollView style={{ height: SCREEN_HEIGHT / 3 }}>
            {months.map(month => (
              <TouchableOpacity
                key={month}
                onPress={() => {
                  setSelectedMonth(month);
                  filterSheetRef.current?.close();
                }}
                style={{ paddingVertical: spacing.sm }}
              >
                <HMAText
                  color={selectedMonth === month ? 'primary' : undefined}
                >
                  {month}
                </HMAText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </HMABottomSheet>
    </Container>
  );
}
