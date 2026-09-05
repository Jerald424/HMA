import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { amtFormat } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { useAuth, useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

export default function PaySlip() {
  const { dashboard } = useAuth();
  const navigation = useNavigation();
  const { colors, spacing, metrics } = useTheme();

  const latest_payslip = dashboard?.data?.dashboard?.payslip?.latest_payslip;
  const currency = latest_payslip?.currency || '';
  console.log('latest_payslip: ', latest_payslip);
  if (!latest_payslip) return null;

  const basic = latest_payslip?.basic ?? 0;
  const gross = latest_payslip?.gross ?? 0;
  const net = latest_payslip?.net ?? gross;
  const deductions = latest_payslip?.deductions ?? 0;
  const allowances = gross - basic;

  const breakdown = [
    { label: 'Basic', value: basic },
    { label: 'Allowances', value: allowances },
    { label: 'Deductions', value: deductions },
  ];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Payslip')}
      activeOpacity={0.88}
    >
      {/* Dark card — uses your theme's title color (deep brown) */}
      <View
        style={{
          backgroundColor: colors.textPrimary,
          borderRadius: metrics.radius.lg,
          padding: spacing.md,
          overflow: 'hidden',
        }}
      >
        {/* Top: label + published badge */}
        <View
          style={[
            cStyle.rowAlign,
            { justifyContent: 'space-between', marginBottom: spacing.xs },
          ]}
        >
          <View>
            <HMAText
              size="small"
              style={{
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase',
                letterSpacing: 0.7,
              }}
            >
              Latest Salary Slip
            </HMAText>
            <HMAText
              size="small"
              style={{ color: 'rgba(255,255,255,0.4)', marginTop: 2 }}
            >
              {latest_payslip?.period}
            </HMAText>
          </View>

          {latest_payslip?.status === 'paid' && (
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                borderRadius: 99,
                paddingHorizontal: spacing.sm,
                paddingVertical: 3,
              }}
            >
              <HMAText size="small" style={{ color: 'rgba(255,255,255,0.75)' }}>
                ✓ Published
              </HMAText>
            </View>
          )}
        </View>

        {/* Net salary amount */}
        <View
          style={[
            cStyle.rowAlign,
            { alignItems: 'flex-end', marginVertical: spacing.sm },
          ]}
        >
          <HMAText size="large" style={{ color: '#FFFFFF', fontSize: 30 }}>
            <HMAText size="small" style={{ color: '#FFFFFF' }}>
              {currency}
            </HMAText>{' '}
            {net}
          </HMAText>
        </View>

        {/* Thin separator */}
        <View
          style={{
            height: 0.5,
            backgroundColor: 'rgba(255,255,255,0.12)',
            marginBottom: spacing.sm,
          }}
        />

        {/* Breakdown + View slip */}
        <View style={[cStyle.rowAlign, { justifyContent: 'space-between' }]}>
          <View style={[cStyle.rowAlign, { gap: spacing.lg }]}>
            {breakdown.map(item => (
              <View key={item.label}>
                <HMAText
                  size="small"
                  style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}
                >
                  {item.label}
                </HMAText>
                <HMAText size="small" style={{ color: '#FFFFFF' }}>
                  <HMAText
                    size="small"
                    style={{ color: '#FFFFFF', fontSize: 8 }}
                  >
                    {currency}{' '}
                  </HMAText>
                  {item.value}
                </HMAText>
              </View>
            ))}
          </View>

          <HMAText size="small" style={{ color: colors?.warning ?? '#F5C97A' }}>
            View slip →
          </HMAText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
