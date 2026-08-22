import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import HMAAccordion from 'src/components/styled/atoms/accordion';
import { colors } from 'src/theme/colors';
import { withOpacity } from 'src/utils/withOpacity';

const COLORS = {
  bg: colors?.lightBackground,
  surface: colors.background,
  surface1: withOpacity(colors.primary, 0.09),
  border: withOpacity(colors.primary, 0.3),
  borderAccent: withOpacity(colors.primary, 0.3),
  primary: colors.textPrimary,
  secondary: colors.textSecondary,
  muted: '#9CA3AF',
  accent: colors.info,
  accentBg: withOpacity(colors.info, 0.1),
  success: colors.success,
  successBg: withOpacity(colors.success, 0.1),
  danger: colors.error,
};

type PayslipRow = { name: string; amount: number };

type PayslipData = {
  basic_salary?: number | null;
  allowances?: PayslipRow[] | null;
  deductions?: PayslipRow[] | null;
  gross_salary?: number | null;
  total_deductions?: number | null;
  net_salary?: number | null;
  company?: string | null;
  reference?: string | null;
  month?: string | null;
  employee_id?: string | number | null;
  id?: string | number | null;
  payslip_id?: string | number | null;
  currency?: string | null;
  period?: { from?: string | null; to?: string | null } | null;
};

type PayslipDetailProps = { data?: PayslipData | null };
type PillProps = { label: string; color: string; bg: string };
type StatCardProps = {
  label: string;
  value?: number | null;
  valueColor?: string;
  currency: string;
};
type SectionRowProps = {
  name: string;
  amount?: number | null;
  isTotal?: boolean;
  currency: string;
};
type SectionProps = {
  title: string;
  rows: PayslipRow[];
  total?: number | null;
  totalLabel: string;
  currency: string;
};

const fmt = (n?: number | null): string => (n ?? 0).toLocaleString('en-US');

// ─── Sub-components ────────────────────────────────────────────────────

const Pill = ({ label, color, bg }: PillProps) => (
  <View style={[s.pill, { backgroundColor: bg }]}>
    <Text style={[s.pillText, { color }]}>{label}</Text>
  </View>
);

const StatCard = ({ label, value, valueColor, currency }: StatCardProps) => (
  <View style={s.statCard}>
    <Text style={s.statLabel}>{label}</Text>
    <Text style={[s.statValue, valueColor && { color: valueColor }]}>
      {fmt(value)} <Text style={s.statCurrency}>{currency}</Text>
    </Text>
  </View>
);

const SectionRow = ({
  name,
  amount,
  isTotal = false,
  currency,
}: SectionRowProps) => (
  <View style={[s.row, isTotal && s.rowTotal]}>
    <Text style={[s.rowName, isTotal && s.rowNameTotal]}>{name}</Text>
    <Text
      style={[
        s.rowAmt,
        isTotal && s.rowAmtTotal,
        !isTotal && (amount ?? 0) === 0 && s.rowAmtMuted,
        !isTotal && (amount ?? 0) > 0 && s.rowAmtGreen,
      ]}
    >
      {(amount ?? 0) === 0 && !isTotal ? '—' : `${fmt(amount)} ${currency}`}
    </Text>
  </View>
);

const Section = ({
  title,
  rows,
  total,
  totalLabel,
  currency,
}: SectionProps) => (
  <View style={s.section}>
    {title && <Text style={s.sectionTitle}>{title}</Text>}
    {rows.map((r, i) => (
      <SectionRow key={i} name={r.name} amount={r.amount} currency={currency} />
    ))}
    {totalLabel && (
      <SectionRow
        name={totalLabel}
        amount={total}
        isTotal
        currency={currency}
      />
    )}
  </View>
);

// ─── Main Component ────────────────────────────────────────────────────

export default function PayslipDetailUI({ data: rawData }: PayslipDetailProps) {
  const data = rawData ?? {};
  const currency = data.currency ?? '';
  const allowances = data.allowances ?? [];
  const deductions = data.deductions ?? [];
  const earnings = [
    { name: 'Basic Salary', amount: data.basic_salary ?? 0 },
    ...allowances,
  ];

  const salaryComputations = useMemo(() => {
    try {
      return data?.salary_computation?.map(item => ({
        name: item?.name,
        amount: item?.total,
      }));
    } catch (error) {}
  }, [data]);

  return (
    <ScrollView
      contentContainerStyle={s.scroll}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Card */}
      <View style={s.card}>
        <Text style={s.company}>{data.company}</Text>
        <Text style={s.empName}>{data.reference}</Text>
        <Text style={s.ref}>Salary Slip · {data.month}</Text>

        <View style={s.pillRow}>
          <Pill label="Published" color="#065F46" bg="#D1FAE5" />
          <Pill
            label={`Emp #${data.employee_id}`}
            color={COLORS.accent}
            bg={COLORS.accentBg}
          />
          <Pill label={data.id} color={COLORS.accent} bg={COLORS.accentBg} />
        </View>

        <View style={s.divider} />

        <Text style={s.period}>
          Pay period:{' '}
          <Text style={s.periodBold}>
            {data.period?.from ?? '—'} – {data.period?.to ?? '—'}
          </Text>
        </Text>
      </View>

      {/* Net Salary Card */}
      <View style={[s.card, s.netCard]}>
        <View>
          <Text style={s.netLabel}>Net salary</Text>
          <View style={s.netAmountRow}>
            <Text style={s.netAmount}>{fmt(data.net_salary)}</Text>
            <Text style={s.netCurrency}> {currency}</Text>
          </View>
        </View>
        <View style={s.checkCircle}>
          <Text style={s.checkMark}>✓</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={s.statsGrid}>
        <StatCard
          label="Basic salary"
          value={data.basic_salary}
          currency={currency}
        />
        <StatCard
          label="Gross salary"
          value={data.gross_salary}
          currency={currency}
        />
        <StatCard
          label="Allowances"
          value={allowances.reduce((a, b) => a + (b.amount ?? 0), 0)}
          currency={currency}
        />
        <StatCard
          label="Deductions"
          value={data.total_deductions}
          valueColor={COLORS.danger}
          currency={currency}
        />
      </View>

      {/* Earnings Section */}
      <Section
        title="EARNINGS"
        rows={earnings}
        total={data.gross_salary}
        totalLabel="Total earnings"
        currency={currency}
      />

      {/* Deductions Section */}
      <Section
        title="DEDUCTIONS"
        rows={deductions}
        total={data.total_deductions}
        totalLabel="Total deductions"
        currency={currency}
      />
      <HMAAccordion title="Additional Information">
        <Section
          // title="EARNINGS"
          rows={salaryComputations}
          // total={data.gross_salary}
          // totalLabel="Total earnings"
          currency={currency}
        />
      </HMAAccordion>
      {/* Footer */}
      <View style={s.footer}>
        <Text style={s.footerText}>Payslip ID: #{data.payslip_id}</Text>
        <Text style={s.footerText}>Employee ID: #{data.employee_id}</Text>
      </View>
    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16, paddingBottom: 32 },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },
  company: {
    fontSize: 11,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  empName: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.primary,
    marginBottom: 2,
  },
  ref: { fontSize: 12, color: COLORS.secondary, marginBottom: 12 },

  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  pill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99 },
  pillText: { fontSize: 11, fontWeight: '500' },

  divider: { height: 0.5, backgroundColor: COLORS.border, marginBottom: 10 },
  period: { fontSize: 12, color: COLORS.secondary },
  periodBold: { color: COLORS.primary, fontWeight: '500' },

  netCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.borderAccent,
  },
  netLabel: { fontSize: 12, color: COLORS.secondary, marginBottom: 4 },
  netAmountRow: { flexDirection: 'row', alignItems: 'baseline' },
  netAmount: { fontSize: 28, fontWeight: '500', color: COLORS.accent },
  netCurrency: { fontSize: 14, color: COLORS.secondary },
  checkCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.accentBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { fontSize: 20, color: COLORS.accent },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: COLORS.surface1,
    borderRadius: 8,
    padding: 14,
  },
  statLabel: { fontSize: 11, color: COLORS.muted, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '500', color: COLORS.primary },
  statCurrency: { fontSize: 12, color: COLORS.muted, fontWeight: '400' },

  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    marginBottom: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.secondary,
    letterSpacing: 0.8,
    padding: 12,
    paddingBottom: 6,
    textTransform: 'uppercase',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
  },
  rowTotal: { backgroundColor: COLORS.surface1 },
  rowName: { fontSize: 14, color: COLORS.primary },
  rowNameTotal: { fontSize: 13, fontWeight: '500', color: COLORS.secondary },
  rowAmt: { fontSize: 14, fontWeight: '500', color: COLORS.primary },
  rowAmtTotal: { fontSize: 15 },
  rowAmtMuted: { color: COLORS.muted, fontWeight: '400' },
  rowAmtGreen: { color: COLORS.success },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  footerText: { fontSize: 12, color: COLORS.muted },
});
