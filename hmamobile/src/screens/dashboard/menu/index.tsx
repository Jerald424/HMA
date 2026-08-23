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

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Leave',
    key: 'leave',
    link: 'Leave',
    icon: 'leave',
    colors: { bg: '#daedff' },
  },
  {
    label: 'Payslip',
    key: 'Payslip',
    link: 'Payslip',
    icon: 'payslip',
    colors: { bg: '#d7ffdf' },
  },
  {
    label: 'Documents',
    key: 'Document Center',
    link: 'Documents',
    icon: 'documents',
    colors: { bg: '#fdfdde' },
  },
  {
    label: 'Requests',
    key: 'Requests',
    link: 'Requests',
    icon: 'request',
    colors: { bg: '#fdeede' },
  },
  {
    label: 'Expenses',
    key: 'Expenses',
    link: 'Expenses',
    icon: 'expenses',
    colors: { bg: '#91541214' },
  },
];

// Split items into rows of 2
const rows = MENU_ITEMS.reduce<MenuItem[][]>((acc, item, i) => {
  if (i % 2 === 0) acc.push([item]);
  else acc[acc.length - 1].push(item);
  return acc;
}, []);

export default function DashboardMenus() {
  return (
    <View style={{ gap: 8 }}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={[cStyle.row, { gap: 8 }]}>
          {row.map(item => (
            <PillItem key={item.key} item={item} />
          ))}
          {/* If odd number of items, fill the empty slot */}
          {row.length === 1 && <View style={{ flex: 1 }} />}
        </View>
      ))}
      <HMADivider space="sm" />
    </View>
  );
}

function PillItem({ item }: { item: MenuItem }) {
  const { colors, spacing, metrics } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation?.navigate(item.link)}
      activeOpacity={0.75}
      style={[
        cStyle.rowAlign,
        {
          flex: 1,
          gap: spacing.sm,
          padding: spacing.sm,
          backgroundColor: colors.background,
          borderRadius: metrics.radius.lg,
          borderWidth: 0.5,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Colored icon box */}
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: metrics.radius.md,
          backgroundColor: item.colors.bg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HMAIcon size="md" variant="transparent" name={item.icon} />
      </View>

      {/* Label */}
      <HMAText size="small" style={{ fontWeight: '500' }}>
        {item.label}
      </HMAText>
    </TouchableOpacity>
  );
}
