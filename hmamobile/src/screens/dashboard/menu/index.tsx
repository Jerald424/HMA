import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import { iconType } from 'src/components/styled/atoms/icon/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';

export default function DashboardMenus() {
  return (
    <>
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
            link: 'Documents',
            icon: 'documents' as iconType,
          },

          // { label: 'dummy1', key: 'dummy1' },
        ].map(item => (
          <EachRequest key={item?.key} item={item} />
        ))}
      </View>
      <HMADivider space={'sm'} />

      <View style={[cStyle.row, { gap: 30 }]}>
        {[
          {
            label: 'Requests',
            key: 'Requests',
            colors: { bg: '#fdeede' },
            link: 'Requests',
            icon: 'request' as iconType,
          },
          {
            label: 'Expenses',
            key: 'Expenses',
            colors: { bg: '#91541214' },
            link: 'Expenses',
            icon: 'expenses' as iconType,
          },
          { label: 'dummy2', key: 'dummy2' },
        ].map(item => (
          <EachRequest key={item?.key} item={item} />
        ))}
      </View>
      <HMADivider space={'sm'} />
    </>
  );
}

const EachRequest = ({ item }: { item: any }) => {
  const { colors, spacing, metrics } = useTheme();

  const navigation = useNavigation();
  if (item?.key?.includes('dummy')) return <View style={{ flex: 1 }} />;
  return (
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
  );
};
