import HMAButton from 'src/components/styled/atoms/button';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

export default function DashboardAttPermission() {
  const { spacing } = useTheme();
  return (
    <HMACard style={{ padding: spacing.md }}>
      <HMAIcon size="md" name="maps_flag" style={{ alignSelf: 'center' }} />
      <HMADivider />
      <HMAText align="center" variant="title">
        Allow location access
      </HMAText>
      <HMADivider />

      <HMAText align="center" color="textSecondary">
        Needed to verify you're on-site when you check in or out. Only checked
        while the app is open.
      </HMAText>
      <HMADivider />
      <HMAButton title="Allow location access" />
    </HMACard>
  );
}
