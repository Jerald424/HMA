import { FlatList, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import useLeaveList from './useLeaveList';
import BalanceCards from './BalanceCards';

export default function LeaveList({ navigation }) {
  const { colors, spacing } = useTheme();
  const { leaveBalance } = useLeaveList();

  return (
    <Container>
      <BalanceCards balances={leaveBalance?.balances} />
      <FlatList
        data={[]}
        renderItem={() => <></>}
        ListEmptyComponent={() => <NoData />}
      />
      <HMAButton
        title="Create"
        onPress={() => navigation?.navigate('Leave Detail')}
      />
    </Container>
  );
}
