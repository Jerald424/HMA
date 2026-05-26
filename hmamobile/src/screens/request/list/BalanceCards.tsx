import { ScrollView } from 'react-native';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

export default function BalanceCards({ balances }: { balances: any }) {
  const { spacing, metrics } = useTheme();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ flexGrow: 0 }}
    >
      {balances?.map((balance: any, index: number) => (
        <HMACard
          key={balance?.type + index}
          style={{
            padding: spacing.md,
            width: 150,
            borderRadius: metrics?.radius?.md,
          }}
        >
          <HMAText align="center" variant="title">
            {balance?.type}
          </HMAText>
          <HMADivider thickness={1} />
          <HMAText size="small" variant="large" align="center">
            Ent: {balance?.entitled || '-'}
          </HMAText>
          <HMAText size="small" variant="large" align="center">
            Taken: {balance?.taken || '-'}
          </HMAText>
        </HMACard>
      ))}
    </ScrollView>
  );
}
