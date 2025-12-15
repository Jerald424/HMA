import { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
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
import HMAModalOrganism from 'src/components/styled/organism/modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_ATTENDANCE_RECORD } from 'src/utils/variables';

export default function SyncAttendance() {
  const { localRecord, onMatch, isLoadingMark, setLocalRecord } =
    useLandingContext();
  const { spacing, colors, metrics } = useTheme();
  const { isConnected } = useAppContext();
  const [deleteRecord, setDeleteRecord] = useState();

  const syncData = async () => {
    for (let emp of localRecord) {
      onMatch(emp);
    }
  };

  const handleDelete = async () => {
    const updated = localRecord?.filter(
      res => res?.timestamp !== deleteRecord?.timestamp,
    );
    setLocalRecord(updated);
    await AsyncStorage.setItem(
      LOCAL_ATTENDANCE_RECORD,
      JSON.stringify(updated),
    );
    setDeleteRecord();
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
            <Pressable
              onPress={() => setDeleteRecord(item)}
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
            </Pressable>
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
      <HMAModalOrganism
        isVisible={!!deleteRecord}
        headingProps={{ children: 'Are you sure' }}
        descriptionProps={{ children: 'Do you want to delete' }}
        okTextProps={{ children: 'OK', onPress: handleDelete }}
        cancelTextProps={{
          children: 'Cancel',
          onPress: () => setDeleteRecord(),
        }}
      />
    </Container>
  );
}
