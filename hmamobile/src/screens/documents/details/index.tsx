import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { Dimensions, Linking } from 'react-native';
import WebView from 'react-native-webview';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import axiosInstance from 'src/services/axiosInstance';
import Pdf from 'react-native-pdf';

const fetchDetailDoc = async ({ doc_id }: { doc_id: number }) => {
  return await axiosInstance.get(`/api/documents/${doc_id}/view`);
};

export default function DocumentsDetail({ route, navigation }: any) {
  const data = useMemo(() => {
    try {
      return JSON.parse(route?.params?.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const { data: dData, isPending } = useQuery({
    queryKey: ['fetch/detail-doc'],
    queryFn: () => fetchDetailDoc({ doc_id: data?.doc_id }),
  });

  useEffect(() => {
    navigation?.setOptions({
      title: dData?.title,
    });
  }, []);

  return (
    <Container>
      <HMAModalLoader isVisible={isPending} />
      <Pdf
        trustAllCerts={false}
        source={{ uri: dData?.view_url }}
        style={{
          flex: 1,
          // width: Dimensions.get('window').width,
          // height: Dimensions.get('window').height,
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Page ${page} of ${numberOfPages}`);
        }}
        onError={error => {
          console.log('PDF Error:', error);
        }}
        onPressLink={uri => {
          console.log('Link pressed:', uri);
        }}
      />

      {dData?.download_allowed && (
        <>
          <HMADivider />
          <HMAButton
            title="Download"
            onPress={() => Linking.openURL(dData?.view_url)}
          />
        </>
      )}
    </Container>
  );
}
