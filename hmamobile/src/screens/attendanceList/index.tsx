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

export default function AttendanceList() {
  const { onEndReach, list, isLoading } = useAttendanceList();
  const { spacing } = useTheme();
  return (
    <Container padding={0} safeAreaViewProps={{ edges: [] }}>
      <FlatList
        ListFooterComponent={
          isLoading ? (
            <>
              <HMADivider />
              <HMALoader size={'large'} />
              <HMADivider />
            </>
          ) : (
            <></>
          )
        }
        data={list}
        renderItem={({ item }) => {
          return (
            <>
              <HMACard style={{ padding: spacing?.sm }}>
                <HMAText>{item?.date}</HMAText>
                <HMADivider thickness={1} />
                <HMAText size="small">Project: {item?.project?.name}</HMAText>
                <HMADivider />
                <View style={cStyle.row}>
                  <HMABadge
                    color={item?.type == 'in' ? 'success' : 'error'}
                    label={item?.type == 'in' ? 'Check In' : 'Check Out'}
                  />
                  <HMADivider variant="vertical" />
                  <HMABadge
                    color="info"
                    label={`Worked Hour: ${item?.['Worked Hours']}`}
                  />
                  <HMADivider variant="vertical" />

                  <HMABadge
                    color="secondary"
                    label={`Overtime: ${item?.['Overtime']}`}
                  />
                </View>
              </HMACard>
              <HMADivider />
            </>
          );
        }}
        onEndReached={() => onEndReach()}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
}
