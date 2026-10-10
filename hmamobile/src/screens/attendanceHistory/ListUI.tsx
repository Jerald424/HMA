import { RefreshControl, SectionList, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { blendWithWhite } from 'src/function/colorCorrection';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';

// ─── Types ────────────────────────────────────────────────
type AttendanceRecord = {
  id: number;
  check_in: string;
  check_out: string | null;
  status: string;
  worked_hours: string;
  overtime: number;
  project: { id: number; name: string };
};

// ─── Helpers ──────────────────────────────────────────────

/** "12/09/2026 15:50:46" → Date */
const parseDate = (str: string): Date => {
  const [datePart, timePart] = str.split(' ');
  const [dd, mm, yyyy] = datePart.split('/');
  return new Date(`${yyyy}-${mm}-${dd}T${timePart}`);
};

/** Date → "15:50" */
const toTime = (str: string): string => {
  const d = parseDate(str);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

/** Date → "Saturday, 12 Sep 2026" */
const toDayLabel = (str: string): string =>
  parseDate(str).toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

/** "9.42" → "9h 42m" */
const formatHours = (val: string): string => {
  const [h, dec] = val.split('.');
  const mins = dec ? Math.round((parseInt(dec) / 100) * 60) : 0;
  return `${h}h ${String(mins).padStart(2, '0')}m`;
};

/** "#5203 - Al Sraiya..." → { code: "#5203", name: "Al Sraiya..." } */
const splitProjectName = (name: string) => {
  const dashIdx = name.indexOf(' - ');
  if (dashIdx === -1) return { code: '', name };
  return {
    code: name.slice(0, dashIdx),
    name: name.slice(dashIdx + 3),
  };
};

/** Group records by day label */
const groupByDay = (records: AttendanceRecord[]) => {
  const map: Record<string, AttendanceRecord[]> = {};
  records?.forEach(r => {
    const key = toDayLabel(r.check_in);
    if (!map[key]) map[key] = [];
    map[key].push(r);
  });
  return Object.entries(map)?.map(([title, data]) => ({ title, data }));
};

// ─── Card ─────────────────────────────────────────────────
function AttendanceCard({ item }: { item: AttendanceRecord }) {
  const { colors, spacing, metrics } = useTheme();
  const { code, name } = splitProjectName(item.project.name);
  const isCompleted = item.status === 'completed';

  return (
    <HMACard
      style={{
        padding: spacing.md,
        borderRadius: metrics.radius.lg,
        marginBottom: spacing.sm,
      }}
    >
      {/* Top: project + status pill */}
      <View
        style={[
          cStyle.rowAlign,
          { justifyContent: 'space-between', marginBottom: spacing.sm },
        ]}
      >
        <View style={{ flex: 1, marginRight: spacing.sm }}>
          {!!code && (
            <HMAText
              color="textSecondary"
              size="small"
              style={{ marginBottom: 2 }}
            >
              {code}
            </HMAText>
          )}
          <HMAText
            size="regular"
            style={{ fontWeight: '500', lineHeight: 18 }}
            numberOfLines={2}
          >
            {name}
          </HMAText>
        </View>

        <View
          style={{
            backgroundColor: isCompleted
              ? blendWithWhite(colors.success, 0.8)
              : blendWithWhite(colors.warning, 0.8),
            borderRadius: 99,
            paddingHorizontal: spacing.sm,
            paddingVertical: 3,
          }}
        >
          <HMAText
            size="small"
            style={{
              color: isCompleted ? colors.success : colors.warning,
              fontWeight: '500',
              textTransform: 'capitalize',
            }}
          >
            {item.status}
          </HMAText>
        </View>
      </View>

      {/* Check in → Check out strip */}
      <View
        style={[
          cStyle.rowAlign,
          {
            backgroundColor: colors.lightBackground,
            borderRadius: metrics.radius.md,
            padding: spacing.sm,
            marginBottom: spacing.sm,
          },
        ]}
      >
        {/* In */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <HMAText
            color="textSecondary"
            size="small"
            style={{ marginBottom: 3 }}
          >
            Check In
          </HMAText>
          <HMAText size="regular" style={{ fontWeight: '700' }}>
            {toTime(item.check_in)}
          </HMAText>
        </View>

        {/* Arrow divider */}
        <View style={{ alignItems: 'center', paddingHorizontal: spacing.sm }}>
          <View
            style={{
              width: 28,
              height: 1.5,
              backgroundColor: colors.border,
              marginBottom: 3,
            }}
          />
          <HMAText color="textSecondary" size="small">
            →
          </HMAText>
        </View>

        {/* Out */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <HMAText
            color="textSecondary"
            size="small"
            style={{ marginBottom: 3 }}
          >
            Check Out
          </HMAText>
          <HMAText size="regular" style={{ fontWeight: '700' }}>
            {item.check_out ? toTime(item.check_out) : '—'}
          </HMAText>
        </View>
      </View>

      {/* Footer: worked hours + overtime badge */}
      <View style={[cStyle.rowAlign, { justifyContent: 'space-between' }]}>
        <View style={[cStyle.rowAlign, { gap: spacing.xs }]}>
          <HMAText color="textSecondary" size="small">
            ⏱ Worked
          </HMAText>
          <HMAText size="small" style={{ fontWeight: '600' }}>
            {formatHours(item.worked_hours)}
          </HMAText>
        </View>

        {item.overtime > 0 && (
          <View
            style={{
              backgroundColor: blendWithWhite(colors.warning, 0.8),
              borderRadius: 99,
              paddingHorizontal: spacing.sm,
              paddingVertical: 2,
            }}
          >
            <HMAText
              size="small"
              style={{ color: colors.warning, fontWeight: '500' }}
            >
              OT: {item.overtime}h
            </HMAText>
          </View>
        )}
      </View>
    </HMACard>
  );
}

// ─── Main List ────────────────────────────────────────────
export default function AttendanceList({
  records,
  refetch,
  isPending,
}: {
  records: AttendanceRecord[];
  refetch: () => void;
  isPending: boolean;
}) {
  const { colors, spacing } = useTheme();
  const sections = groupByDay(records);

  return (
    <SectionList
      refreshControl={
        <RefreshControl onRefresh={refetch} refreshing={isPending} />
      }
      sections={sections}
      keyExtractor={item => String(item.id)}
      showsVerticalScrollIndicator={false}
      //   contentContainerStyle={{ padding: spacing.md }}
      renderSectionHeader={({ section }) => (
        <View style={{ marginBottom: spacing.xs, marginTop: spacing.sm }}>
          <HMAText
            color="textSecondary"
            size="small"
            style={{
              textTransform: 'uppercase',
              letterSpacing: 0.7,
              fontWeight: '500',
            }}
          >
            {section.title}
          </HMAText>
        </View>
      )}
      renderItem={({ item }) => <AttendanceCard item={item} />}
      SectionSeparatorComponent={() => <HMADivider space="xs" />}
      ListEmptyComponent={isPending ? <></> : <NoData />}
    />
  );
}
