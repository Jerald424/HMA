import { useEffect, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import HMABadge from 'src/components/styled/atoms/badge';
import HMAButton from 'src/components/styled/atoms/button';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { amtFormat } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import Download from './Download';
import useDetailPayslip from './useDetailPayslip';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import PayslipDetailUI from './UI';

export default function PayslipDetail({ navigation, route }) {
  const params = route?.params;
  const { data, isLoading } = useDetailPayslip(params);
  console.log('data: ', data);

  useEffect(() => {
    navigation.setOptions({
      title: params?.month,
    });
  }, []);
  return (
    <Container padding={0}>
      {isLoading ? (
        <HMAModalLoader isVisible />
      ) : (
        <>
          <PayslipDetailUI data={data} params={params} />
        </>
      )}
    </Container>
  );
}
