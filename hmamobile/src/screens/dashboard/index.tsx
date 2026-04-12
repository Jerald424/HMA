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

export default function Dashboard({ navigation }) {
  const { colors, spacing, metrics } = useTheme();

  return (
    <Container
      padding={0}
      backgroundColor="primary"
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
          <View>
            <HMADivider />

            <HMAText>Leave Balances</HMAText>
            <HMADivider />
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{ flexGrow: 0 }}
            >
              {[
                { label: 'Annual', value: 10 },
                { label: 'Sick', value: 10 },
                { label: 'Paid', value: 10 },
              ].map(item => (
                <View
                  key={item?.label}
                  style={{
                    padding: spacing.lg,
                    backgroundColor: colors?.background,
                    marginRight: spacing.lg,
                    width: 100,
                    borderRadius: metrics?.radius?.lg,
                  }}
                >
                  <HMAText color="textSecondary" size="regular" align="center">
                    {item?.label}
                  </HMAText>
                  <HMAText size="title" align="center">
                    {item?.value}
                  </HMAText>
                </View>
              ))}
            </ScrollView>
          </View>
          <HMADivider space={'sm'} />

          <HMACard
            style={{ padding: spacing.md, borderRadius: metrics.radius.lg }}
          >
            <HMAText color="textSecondary">Today Attendance Status</HMAText>
            <HMADivider thickness={1} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <HMAText color="error" size="title" style={{ flex: 1 }}>
                Checkout
              </HMAText>
              <View style={{ flexDirection: 'row' }}>
                <HMAText>in: 8:20 {'  '}</HMAText>
                <HMAText>out: 8:20</HMAText>
              </View>
            </View>
          </HMACard>
          <HMADivider space={'sm'} />

          <HMACard
            style={{ padding: spacing.md, borderRadius: metrics.radius.lg }}
          >
            <HMAText color="textSecondary">Last Month Payslip - Jun</HMAText>
            <HMADivider thickness={1} />
            <HMAText size="title">$1600</HMAText>
          </HMACard>
          <HMADivider space={'sm'} />

          <HMAText>Requests</HMAText>
          <HMADivider space={'sm'} />

          <View style={[cStyle.row, { gap: 30 }]}>
            {[
              {
                label: 'Leave',
                key: 'leave',
                colors: { bg: '#FFE2E2', text: '#C11007' },
                link: 'Leave',
              },
              {
                label: 'Payslip',
                key: 'Payslip',
                colors: { bg: '#EDE9FE', text: '#7008E7' },
                link: 'Leave',
              },
              {
                label: 'Documents',
                key: 'Document Center',
                colors: { bg: '#D0FAE5', text: '#1F7A55' },
                link: 'Leave',
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
                    name="eye"
                    style={{ tintColor: item?.colors?.text }}
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
