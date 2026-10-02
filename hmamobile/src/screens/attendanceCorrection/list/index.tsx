import { useQuery } from '@tanstack/react-query';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import useUserId from 'src/hooks/useUserId';
import { useTheme } from 'src/hooks/useTheme';
import axiosInstance from 'src/services/axiosInstance';
import { cStyle } from 'src/utils/style';
import { getLeaveDuration } from 'src/screens/leave/create/useCreate';
import {
  formateDate,
  formatToShortDate,
  YYYYMMDDToJsDate,
} from 'src/function/dateConversion';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import { blendWithWhite } from 'src/function/colorCorrection';
import HMABadge from 'src/components/styled/atoms/badge';
import HMAButton from 'src/components/styled/atoms/button';

export type Approval = {
  id: string;
  type: string;
  employee: string;
  submitted: string;
  urgency?: string;
};

// 	“Params”:{
// 	“Offset”: 20,                          // Optional
// 	“Limit”: 10,                            // Optional
// 	“State”: “submitted”,             // Optional
// 	“Date_from”: “02/09/2026”,  // Optional
// 	“Date_to”: ”02/09/2026”       // Optional
// }

async function fetchAttendanceCorrections() {
  return axiosInstance.post(`/api/employee/attendance/list`, {
    params: {
      limit: 200,
    },
  });
}

export default function AttendanceCorrectionList({ navigation }) {
  const { spacing, metrics } = useTheme();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['fetch/attendance-corrections'],
    queryFn: fetchAttendanceCorrections,
  });
  console.log('data:==> ', data);
  return (
    <Container>
      <FlatList
        data={data?.result?.records}
        keyExtractor={item => item.id}
        // contentContainerStyle={{  flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        ListHeaderComponent={
          <View style={{ marginBottom: spacing.md }}>
            <HMAText size="title">Attendance Corrections</HMAText>
          </View>
        }
        ListEmptyComponent={() => (isFetching ? null : <NoData />)}
        renderItem={({ item }) => <SeparateItem item={item} />}
      />
      <HMADivider />
      <HMAButton
        title="Create new"
        onPress={() => navigation.navigate('AttendanceCorrectionDetail')}
      />
    </Container>
  );
}

const SeparateItem = ({ item }: { item: any }) => {
  const { spacing, colors, metrics } = useTheme();
  const isCompleted = item?.status == 'completed';
  const date = formateDate(item?.check_in);
  return (
    <>
      <HMACard
        style={{
          padding: spacing.md,
          flexDirection: 'row',
          borderRadius: metrics?.radius.lg,
        }}
      >
        {/* <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: isCompleted
              ? blendWithWhite(colors.success, 0.8)
              : blendWithWhite(colors.error, 0.8),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}
        >
          <HMAIcon
            tintColor={isCompleted ? colors.success : colors.error}
            name={isCompleted ? 'calendar' : 'clock-three'}
            size="xs"
          />
        </View> */}
        {/* <HMADivider variant="vertical" /> */}
        <View style={{ flex: 1 }}>
          <HMAText variant="regular">
            {date?.date} {date?.time}
          </HMAText>
          <HMADivider space={'xxs'} />
          <HMAText color="textSecondary" size="small">
            {item?.project?.name}
          </HMAText>
          <HMADivider space={'xxs'} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <HMAIcon name="clock-three" style={{ height: 10, width: 10 }} />
            <HMADivider variant="vertical" />
            <HMAText size="small" variant="title" color="textSecondary">
              {item?.worked_hours} hrs
            </HMAText>
            <HMADivider variant="vertical" thickness={1} />
            <HMAText size="small" color="textSecondary">
              OT: {item?.overtime}
            </HMAText>
          </View>
        </View>
        <HMABadge
          size="sm"
          label={item?.status}
          color={isCompleted ? 'success' : 'warning'}
        />
        <HMADivider variant="vertical" />
        <View style={{ justifyContent: 'center' }}>
          <HMAIcon
            name="arrow_down"
            size="xs"
            style={{ transform: [{ rotate: '-90deg' }] }}
          />
        </View>
      </HMACard>
      <HMADivider />
    </>
  );
};
