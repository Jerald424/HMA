import { ScrollView, View } from 'react-native';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import Header from './header';
import LeaveInfo from './leave';
import PaySlip from './payslip';
import TodayAttendanceStatus from './todayAttendanceStatus';
import DashboardMenus from './menu';
import useUserId from 'src/hooks/useUserId';
import PendingApprovals from './approvals';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Dashboard() {
  const { colors, spacing, metrics } = useTheme();
  const userId = useUserId();
  const { top } = useSafeAreaInsets();
  // /api/approvals/pending/{manager_id} userId this is manager id

  return (
    <Container padding={0} isSafeArea={true}>
      <Header />
      <View
        style={{
          flex: 1,
          backgroundColor: colors?.lightBackground,
          borderTopEndRadius: metrics?.radius?.lg,
          borderTopStartRadius: metrics?.radius?.lg,
        }}
      >
        <ScrollView
          style={{ paddingHorizontal: spacing.md }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.xl }}
        >
          <HMADivider space="sm" />

          {/* Attendance first — most time-sensitive */}
          <TodayAttendanceStatus />
          <HMADivider space="sm" />

          <PendingApprovals managerId={userId} />
          <HMADivider space="sm" />

          {/* Leave balance */}
          <LeaveInfo />
          <HMADivider space="sm" />

          {/* Latest payslip */}
          <PaySlip />
          <HMADivider space="sm" />

          {/* Quick access */}
          <HMAText
            color="textSecondary"
            size="small"
            style={{ textTransform: 'uppercase', letterSpacing: 0.8 }}
          >
            Quick Access
          </HMAText>
          <HMADivider space="xs" />
          <DashboardMenus />
        </ScrollView>
      </View>
    </Container>
  );
}
