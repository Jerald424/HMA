import Container from 'src/components/styled/atoms/container';
import useList from './useList';
import { FlatList, RefreshControl, View } from 'react-native';
import HMACard from 'src/components/styled/atoms/card';
import HMAText from 'src/components/styled/atoms/text';
import HMADivider from 'src/components/styled/atoms/divider';
import { useTheme } from 'src/hooks/useTheme';
import HMAButton from 'src/components/styled/atoms/button';
import NoData from 'src/components/layout/noData';

export default function DocumentsList({ navigation }) {
  const { spacing } = useTheme();
  const { data, isPending, refetch } = useList();

  return (
    <Container>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isPending} />
        }
        data={data}
        ListEmptyComponent={isPending ? <></> : <NoData />}
        renderItem={({ item }) => (
          <HMACard style={{ padding: spacing?.md }}>
            <HMAText>{item?.title}</HMAText>
            <HMADivider thickness={1} />
            <View style={{ flexDirection: 'row' }}>
              <HMAText size="small" style={{ flex: 1 }}>
                Category: {item?.category}
              </HMAText>
              <HMAText size="small">Date: {item?.date}</HMAText>
            </View>
            <HMADivider />
            {item?.viewable && (
              <HMAButton
                title="View"
                onPress={() =>
                  navigation?.navigate('Documents Detail', {
                    data: JSON.stringify(item),
                  })
                }
              />
            )}
          </HMACard>
        )}
      />
    </Container>
  );
}
