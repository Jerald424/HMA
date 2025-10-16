import Container from 'src/components/styled/atoms/container';
import useAttendanceList from './useAttendanceList';
import { FlatList, View } from 'react-native';
import HMAText from 'src/components/styled/atoms/text';
import HMADivider from 'src/components/styled/atoms/divider';
import HMALoader from 'src/components/styled/atoms/loader';
import HMACard from 'src/components/styled/atoms/card';
import { useTheme } from 'src/hooks/useTheme';
import HMABadge from 'src/components/styled/atoms/badge';
import { cStyle } from 'src/utils/style';
import FooterLoader from './footerLoader';
import { useMemo } from 'react';
import { formateDate } from 'src/function/dateConversion';
import NoData from 'src/components/layout/noData';

export default function AttendanceList() {
  const { onEndReach, list, isLoading } = useAttendanceList();
  return (
    <Container
      padding={0}
      safeAreaViewProps={{ edges: ['bottom', 'left', 'right'] }}
    >
      <FlatList
        ListFooterComponent={isLoading ? <FooterLoader /> : <></>}
        data={list}
        ListEmptyComponent={isLoading ? <></> : <NoData />}
        renderItem={({ item }) => <SepItem item={item} />}
        onEndReached={() => onEndReach()}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
}

const SepItem = ({ item }: { item: any }) => {
  const { spacing } = useTheme();
  const dtHr = useMemo(() => formateDate(item?.date), [item]);
  return (
    <>
      <HMACard cmpType="View" style={{ padding: spacing?.sm }}>
        <HMAText color="textSecondary">
          {dtHr?.date} {dtHr?.time}
        </HMAText>
        <HMADivider thickness={1} />
        <HMAText color="textSecondary" size="small">
          Project: {item?.project?.name}
        </HMAText>
        <HMADivider />
        <View style={cStyle.row}>
          <HMABadge
            size="sm"
            color={item?.type == 'in' ? 'success' : 'error'}
            label={item?.type == 'in' ? 'Check In' : 'Check Out'}
          />
          <HMADivider variant="vertical" />
          <HMABadge
            size="sm"
            color="info"
            label={`Worked Hour: ${item?.['Worked Hours']}`}
          />
          <HMADivider variant="vertical" />

          <HMABadge
            size="sm"
            color="primary"
            label={`Overtime: ${item?.['Overtime']}`}
          />
        </View>
      </HMACard>
      <HMADivider />
    </>
  );
};
