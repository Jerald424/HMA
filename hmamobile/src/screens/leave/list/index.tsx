import { FlatList, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

export default function LeaveList({ navigation }) {
  const { colors, spacing } = useTheme();

  return (
    <Container>
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
