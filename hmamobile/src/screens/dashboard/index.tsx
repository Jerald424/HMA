import { ScrollView, View } from 'react-native';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import Header from './header';
import LeaveInfo from './leave';
import PaySlip from './payslip';
import TodayAttendanceStatus from './todayAttendanceStatus';
import DashboardMenus from './menu';

export default function Dashboard({ navigation }) {
  const { colors, spacing, metrics } = useTheme();

  return (
    <Container
      padding={0}
      safeAreaViewProps={{
        edges: ['left', 'right'],
      }}
    >
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
