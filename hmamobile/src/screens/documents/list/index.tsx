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
  const docs = [
    {
      id: 'DOC-015',
      title: 'Abigail_Offer_Letter.docx',
      category: 'other',
      viewable: true,
      downloadable: false,
      date: '2026-05-06',
      doc_id: 15,
      screenshot_restricted: false,
      folder: 'Internal',
      tags: [],
      mimetype:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      file_size: 15937,
    },
  ];
  return (
    <Container>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isPending} />
        }
        data={docs}
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
