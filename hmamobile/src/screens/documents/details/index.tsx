import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Linking } from 'react-native';
import WebView from 'react-native-webview';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import axiosInstance from 'src/services/axiosInstance';

const fetchDetailDoc = async ({ doc_id }: { doc_id: number }) => {
  return await axiosInstance.get(`/api/documents/${doc_id}/view`);
};

export default function DocumentsDetail({ route }: any) {
  const data = useMemo(() => {
    try {
      return JSON.parse(route?.params?.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const { data: detailDoc, isPending } = useQuery({
    queryKey: ['fetch/detail-doc'],
    queryFn: () => fetchDetailDoc({ doc_id: data?.doc_id }),
  });

  const dData = {
    view_url:
      'https://brktz.odoo.com/api/payslips/render?token=HEiHNq5gSjRcZmt3Y__zGKmuIDfSRogF.20260525170700.12.374bdfeda444322c&mode=view_only',
    expires_at: '2026-05-06T06:20:46Z',
    download_allowed: false,
    doc_id: 15,
    doc_ref: 'DOC-015',
    title: 'Abigail_Offer_Letter.docx',
    category: 'other',
    mimetype:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    mode: 'view_only',
    ttl_minutes: 60,
  };

  return (
    <Container>
      <HMAModalLoader isVisible={isPending} />
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: dData?.view_url,
        }}
        originWhitelist={['*']}
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
