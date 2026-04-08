import { FlatList, Image, ScrollView, StatusBar, View } from 'react-native';
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
        <View style={{ paddingHorizontal: spacing.md }}>
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
                <HMAText size="regular">{item?.label}</HMAText>
                <HMAText size="title">{item?.value}</HMAText>
              </View>
            ))}
          </ScrollView>
        </View>
        <HMADivider space={'sm'} />

        <View
          style={{
            backgroundColor: colors?.textPrimaryLight,
            padding: spacing?.md,
          }}
        >
          <HMAText>Today Attendance Status</HMAText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <HMAText size="title" style={{ flex: 1 }}>
              Checkout
            </HMAText>
            <View style={{ flexDirection: 'row' }}>
              <HMAText>in: 8:20 {'  '}</HMAText>
              <HMAText>out: 8:20</HMAText>
            </View>
          </View>
        </View>
        <HMADivider space={'sm'} />
        <View
          style={{
            paddingHorizontal: spacing.md,
          }}
        >
          <HMACard
            style={{ padding: spacing.md, borderRadius: metrics.radius.lg }}
          >
            <HMAText>Last Month Payslip - Jun</HMAText>
            <HMADivider thickness={1} />
            <HMAText size="title">$1600</HMAText>
          </HMACard>
        </View>
      </View>
    </Container>
  );
}

/*
 <FlatList
          numColumns={2}
          columnWrapperStyle={{ gap: spacing.lg }}
          data={[
            {
              id: '1',
              image: 'map',
              title: 'Attendance Entry',
              link: 'Map',
            },
            {
              id: '2',
              image: 'checklist',
              title: 'Attendance list',
              link: 'AttendanceList',
            },
          ]}
          renderItem={({ item }) => (
            <HMACard
              onPress={() => navigation.navigate(item?.link)}
              style={[
                {
                  flex: 1,
                  alignItems: 'center',
                  padding: spacing.md,
                  borderRadius: metrics.radius.lg,
                  height: 150,
                  justifyContent: 'center',
                },
              ]}
            >
              <HMAIcon variant="primary" size="lg" name={item?.image} />
              <HMADivider space={'sm'} />
              <HMAText color="primary" align="center">
                {item?.title}
              </HMAText>
            </HMACard>
          )}
        />
*/
