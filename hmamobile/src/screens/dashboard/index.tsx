import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import HMAAvatar from 'src/components/styled/atoms/avatar';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import Header from './header';
import { iconType } from 'src/components/styled/atoms/icon/icon';
import LeaveInfo from './leave';
import PaySlip from './payslip';
import TodayAttendanceStatus from './todayAttendanceStatus';

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

          <HMAText>Requests</HMAText>
          <HMADivider space={'sm'} />

          <View style={[cStyle.row, { gap: 30 }]}>
            {[
              {
                label: 'Leave',
                key: 'leave',
                colors: { bg: '#daedff' },
                link: 'Leave',
                icon: 'leave' as iconType,
              },
              {
                label: 'Payslip',
                key: 'Payslip',
                colors: { bg: '#d7ffdf' },
                link: 'Payslip',
                icon: 'payslip' as iconType,
              },
              {
                label: 'Documents',
                key: 'Document Center',
                colors: { bg: '#fdfdde' },
                link: 'Leave',
                icon: 'documents' as iconType,
              },
              // { label: 'dummy1', key: 'dummy1' },
            ].map(item => (
              <TouchableOpacity
                onPress={() => navigation?.navigate(item?.link)}
                style={{ flex: 1, alignItems: 'center' }}
                key={item?.key}
              >
                <View
                  style={[
                    {
                      backgroundColor: item?.colors?.bg,
                      padding: spacing.md,
                      borderRadius: metrics.radius.lg,
                      height: 70,
                      width: 70,
                    },
                    cStyle.rowJustify,
                  ]}
                >
                  <HMAIcon
                    size="md"
                    variant="transparent"
                    name={item?.icon}
                    // style={{ tintColor: item?.colors?.text }}
                  />
                </View>
                <HMADivider space={'xs'} />

                <HMAText variant="small" align="center" size="small">
                  {item?.label}
                </HMAText>
              </TouchableOpacity>
            ))}
          </View>
          <HMADivider space={'sm'} />
        </ScrollView>
      </View>
    </Container>
  );
}
