import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import { iconType } from 'src/components/styled/atoms/icon/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';

type MenuItem = {
  label: string;
  key: string;
  link: string;
  icon: iconType;
  colors: { bg: string };
};

const ROW_ONE: MenuItem[] = [
  { label: 'Leave',     key: 'leave',           link: 'Leave',     icon: 'leave',     colors: { bg: '#daedff' } },
  { label: 'Payslip',  key: 'Payslip',          link: 'Payslip',   icon: 'payslip',   colors: { bg: '#d7ffdf' } },
  { label: 'Documents',key: 'Document Center',  link: 'Documents', icon: 'documents', colors: { bg: '#fdfdde' } },
];

const ROW_TWO: (MenuItem | null)[] = [
  { label: 'Requests', key: 'Requests', link: 'Requests', icon: 'request',  colors: { bg: '#fdeede'   } },
  { label: 'Expenses', key: 'Expenses', link: 'Expenses', icon: 'expenses', colors: { bg: '#91541214' } },
  null, // spacer — keeps grid aligned
];

export default function DashboardMenus() {
  return (
    <>
      <View style={[cStyle.row, { gap: 30 }]}>
        {ROW_ONE.map(item => (
          <EachMenuItem key={item.key} item={item} />
        ))}
      </View>

      <HMADivider space="sm" />

      <View style={[cStyle.row, { gap: 30 }]}>
        {ROW_TWO.map((item, index) =>
          item ? (
            <EachMenuItem key={item.key} item={item} />
          ) : (
            <View key={`spacer-${index}`} style={{ flex: 1 }} />
          ),
        )}
      </View>

      <HMADivider space="sm" />
    </>
  );
}

function EachMenuItem({ item }: { item: MenuItem }) {
  const { spacing, metrics } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation?.navigate(item.link)}
      style={{ flex: 1, alignItems: 'center' }}
      activeOpacity={0.75}
    >
      <View
        style={[
          cStyle.rowJustify,
          {
            backgroundColor: item.colors.bg,
            padding: spacing.md,
            borderRadius: metrics.radius.lg,
            height: 70,
            width: 70,
          },
        ]}
      >
        <HMAIcon size="md" variant="transparent" name={item.icon} />
      </View>

      <HMADivider space="xs" />

      <HMAText variant="small" align="center" size="small">
        {item.label}
      </HMAText>
    </TouchableOpacity>
  );
}
