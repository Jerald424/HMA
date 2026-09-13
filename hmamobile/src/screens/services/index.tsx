import { FlatList, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import Header from './header';
import { iconType } from 'src/components/styled/atoms/icon/icon';
import HMACard from 'src/components/styled/atoms/card';
import HMAIcon from 'src/components/styled/atoms/icon';
import { SCREEN_WIDTH } from 'src/utils/variables';
import { blendWithWhite } from 'src/function/colorCorrection';
import { cStyle } from 'src/utils/style';
import HMADivider from 'src/components/styled/atoms/divider';
import { useNavigation } from '@react-navigation/native';

export default function ServicesScreen() {
  const { colors, metrics, spacing } = useTheme();
  const { top } = useSafeAreaInsets();

  const timeLeave: menuDataProps = [
    {
      title: 'Attendance',
      description: 'View attendance history',
      icon: 'calendar-day',
      link: 'AttendanceHistory',
    },
    {
      title: 'Leave',
      description: 'Apply & track your leaves',
      icon: 'leave_interface',
      link: 'Leave',
    },
    {
      title: 'Request',
      description: 'Raise & manage requests',
      icon: 'suggestion',
      link: 'Requests',
    },
    {
      title: '',
      description: 'Record your attendance',
      icon: 'land-layer-location',
      link: '',
    },
  ];

  const payAndDocuments: menuDataProps = [
    {
      title: 'Payslips',
      description: 'View your salary slips',
      icon: 'payroll-check',
      link: 'Payslip',
    },
    {
      title: 'Expenses',
      description: 'Log & claim expenses',
      icon: 'expense-bill',
      link: 'Expenses',
    },
    {
      title: 'Documents',
      description: 'Access your documents',
      icon: 'document',
      link: 'Documents',
    },
    {
      title: '',
      description: '',
      icon: 'suggestion',
      link: 'Requests',
    },
  ];

  return (
    <Container padding={0}>
      <Header title="Services" description="Everything you need" />
      <View style={{ flex: 1, padding: spacing.md }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HMAText style={{ letterSpacing: 1 }} color="textSecondary">
            TIME AND LEAVE
          </HMAText>
          <HMADivider />
          <Menus data={timeLeave} />
          <HMADivider space={'md'} />
          <HMAText style={{ letterSpacing: 1 }} color="textSecondary">
            PAY AND DOCUMENT
          </HMAText>
          <HMADivider />
          <Menus data={payAndDocuments} />
          <HMADivider space={'md'} />
        </ScrollView>
      </View>
    </Container>
  );
}

type menuDataProps = {
  title?: string;
  description?: string;
  icon?: iconType;
  link?: string;
}[];
const Menus = ({ data }: { data: menuDataProps }) => {
  const { colors, metrics, spacing } = useTheme();
  const navigation = useNavigation();

  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      numColumns={2}
      columnWrapperStyle={{ gap: 10 }} // ← horizontal gap between columns
      ItemSeparatorComponent={() => (
        <View style={{ height: 10 }} /> // ← vertical gap between rows
      )}
      renderItem={({ item }) =>
        item?.title ? (
          <HMACard
            onPress={() => item?.link && navigation.navigate(item?.link)}
            style={{
              flex: 1,
              padding: spacing.sm,
              borderRadius: metrics.radius.lg,
            }}
          >
            <View
              style={[
                {
                  backgroundColor: blendWithWhite(colors.primary, 0.9),
                  height: 40,
                  width: 40,
                  borderRadius: metrics.radius.md,
                },
                cStyle.rowJustify,
              ]}
            >
              <HMAIcon name={item.icon as any} />
            </View>
            <HMADivider />
            <HMAText variant="title">{item.title}</HMAText>
            <HMAText size="small">{item.description}</HMAText>
          </HMACard>
        ) : (
          <View style={{ flex: 1 }} />
        )
      }
    />
  );
};
