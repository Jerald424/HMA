import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useAppContext } from 'src/App';
import HMABadge from 'src/components/styled/atoms/badge';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { jsDateToTimeFormat } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import { useLandingContext } from '../landing/context';
import isEmpty from 'lodash/isEmpty';
import NoData from 'src/components/layout/noData';

export default function SyncAttendance() {
  const { localRecord, onMatch, isLoadingMark } = useLandingContext();
  const { spacing, colors, metrics } = useTheme();
  const { isConnected } = useAppContext();

  const syncData = async () => {
    for (let emp of localRecord) {
      onMatch(emp);
    }
  };

  useEffect(() => {
    if (isConnected) syncData();
  }, [isConnected]);

  if (isEmpty(localRecord))
    return (
      <Container>
        <NoData />
      </Container>
    );

  return (
    <Container>
      <HMAText size="large">Local Data</HMAText>
      <HMADivider space={'sm'} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={localRecord}
        renderItem={({ item }) => (
          <>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: colors.border,
                padding: spacing.md,
                borderRadius: metrics.radius.sm,
                backgroundColor: colors.background,
              }}
            >
              <HMAText>{item?.name}</HMAText>
              <HMADivider />
              <View style={[cStyle.row]}>
                <HMABadge label={item?.type?.toUpperCase?.()} />
                <HMADivider variant="vertical" />
                <HMABadge
                  label={jsDateToTimeFormat(new Date(+item?.timestamp))}
                />
              </View>
            </View>
            <HMADivider />
          </>
        )}
      />
      <HMAButton
        onPress={syncData}
        disabled={!isConnected}
        isLoading={isLoadingMark}
        title="Sync Manual"
      />
    </Container>
  );
}
