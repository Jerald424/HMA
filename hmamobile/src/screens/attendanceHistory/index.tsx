import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import HMABadge from 'src/components/styled/atoms/badge';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import { jsDateToDDMMYYYY } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import axiosInstance from 'src/services/axiosInstance';
import AttendanceList from './ListUI';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';

// “Params”:{
// 	“Limit”: 20,
// 	“Date_from”: “02/09/2026”,
// 	“Date_to”: ”02/09/2026”,
// 	“Project_id”: 1441
// }

const getAttendance = async (params: any) => {
  return axiosInstance.post('/api/employee/attendance/list', {
    params,
  });
};

const getDateRange = (key: string): { from: Date; to: Date } => {
  const now = new Date();

  const fmt = (d: Date) => d; // "YYYY-MM-DD"

  switch (key) {
    case 'today': {
      const today = fmt(now);
      return { from: today, to: today };
    }

    case 'this-week': {
      const day = now.getDay(); // 0=Sun
      const mon = new Date(now);
      mon.setDate(now.getDate() - ((day + 6) % 7)); // Monday
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6); // Sunday
      return { from: fmt(mon), to: fmt(sun) };
    }

    case 'last-week': {
      const day = now.getDay();
      const thisMonday = new Date(now);
      thisMonday.setDate(now.getDate() - ((day + 6) % 7));
      const lastMon = new Date(thisMonday);
      lastMon.setDate(thisMonday.getDate() - 7);
      const lastSun = new Date(lastMon);
      lastSun.setDate(lastMon.getDate() + 6);
      return { from: fmt(lastMon), to: fmt(lastSun) };
    }

    case 'month': {
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      const to = new Date(now.getFullYear(), now.getMonth() + 1, 0); // last day
      return { from: fmt(from), to: fmt(to) };
    }

    default:
      return { from: fmt(now), to: fmt(now) };
  }
};

// Result shape:
// { key: 'today',     value: 'Today',     from: '2026-09-13', to: '2026-09-13' }
// { key: 'this-week', value: 'This Week', from: '2026-09-08', to: '2026-09-14' }
// { key: 'last-week', value: 'Last Week', from: '2026-09-01', to: '2026-09-07' }
// { key: 'month',     value: 'Sep',       from: '2026-09-01', to: '2026-09-30' }

export default function AttendanceHistory() {
  const { metrics } = useTheme();
  const [filter, setFilter] = useState({
    key: 'this-week',
    value: 'This Week',
    date: getDateRange('this-week'),
  });
  const { spacing } = useTheme();

  const menu = useMemo(() => {
    return [
      {
        key: 'today',
        value: 'Today',
        date: getDateRange('today'),
      },
      {
        key: 'this-week',
        value: 'This Week',
        date: getDateRange('this-week'),
      },
      {
        key: 'last-week',
        value: 'Last Week',
        date: getDateRange('last-week'),
      },
      {
        key: 'month',
        value: `${new Date().toLocaleString('en-US', {
          month: 'short',
        })} - Month`,
        date: getDateRange('month'),
      },
    ];
  }, []);

  const { data, isPending, refetch } = useQuery({
    queryKey: ['get/list-attendance', filter],
    queryFn: () => {
      let params = {
        limit: 20,
        date_from: jsDateToDDMMYYYY(filter?.date?.from),
        date_to: jsDateToDDMMYYYY(filter?.date?.to),
        // “Project_id”: 1441
      };
      console.log('params: ', params);
      return getAttendance(params);
    },
  });

  console.log('data:#### ', data);
  return (
    <Container>
      <HMACard
        cmpType="View"
        style={{ padding: spacing.md, borderRadius: metrics.radius.lg }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: spacing.md }}
        >
          {menu.map(item => (
            <TouchableOpacity key={item.key} onPress={() => setFilter(item)}>
              <HMABadge
                color={item.key == filter?.key ? 'info' : 'textSecondary'}
                label={item?.value}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </HMACard>
      <AttendanceList
        refetch={refetch}
        isPending={isPending}
        records={data?.result?.records}
      />
    </Container>
  );
}
