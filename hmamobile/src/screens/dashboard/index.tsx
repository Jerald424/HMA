import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import { iconType } from 'src/components/styled/atoms/icon/icon';
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
      // backgroundColor="primary"
      safeAreaViewProps={{
        edges: ['left', 'right'],
      }}
    >
      <Header />
      <View
        style={{
          flex: 3,
          backgroundColor: colors?.lightBackground,
          borderTopEndRadius: metrics?.radius?.lg,
          borderTopStartRadius: metrics?.radius?.lg,
          // padding: spacing.lg,
        }}
      >
        <ScrollView style={{ paddingHorizontal: spacing.md }}>
          <LeaveInfo />
          <HMADivider space={'sm'} />

          <TodayAttendanceStatus />
          <HMADivider space={'sm'} />
          <PaySlip />
          <HMADivider space={'sm'} />

          <HMAText>Menu</HMAText>
          <HMADivider space={'sm'} />
          <DashboardMenus />
        </ScrollView>
      </View>
    </Container>
  );
}
