import { ScrollView } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import Toast from 'src/components/styled/atoms/toast';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import HMAForm from 'src/components/styled/organism/form';
import useExpenseDetail from './useExpenseDetail';
import { useEffect } from 'react';

export default function ExpenseDetail({ route }) {
  const {
    formData,
    isLoadingExpCategory,
    isLoadingExpUpdating,
    control,
    handleSubmit,
    toastRef,
  } = useExpenseDetail();

  useEffect(() => {
    try {
      const rData = route.params && JSON.parse(route.params);
      console.log('RDATA: ', rData);
    } catch (error) {
      console.error('ERROR WHILE PARSE', error);
    }
  }, []);
  return (
    <Container backgroundColor="background">
      <Toast ref={toastRef} showMs={10000} />
      <ScrollView>
        <HMAForm data={formData} control={control} />
      </ScrollView>
      <HMAButton title="Submit" onPress={handleSubmit} />
      <HMAModalLoader
        isVisible={isLoadingExpCategory || isLoadingExpUpdating}
      />
    </Container>
  );
}
