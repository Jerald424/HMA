import { ScrollView, View } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import Toast from 'src/components/styled/atoms/toast';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import HMAForm from 'src/components/styled/organism/form';
import useExpenseDetail from './useExpenseDetail';
import { useEffect } from 'react';
import { YYYYMMDDToJsDate } from 'src/function/dateConversion';
import UploadEvidence from './upload';
import HMADivider from 'src/components/styled/atoms/divider';

export default function ExpenseDetail({ route }) {
  const {
    formData,
    isLoadingExpCategory,
    isLoadingExpUpdating,
    control,
    handleSubmit,
    toastRef,
    reset,
  } = useExpenseDetail();

  const getRData = () => {
    try {
      return route.params && JSON.parse(route.params);
    } catch (error) {}
  };

  const rData = getRData();
  console.log('rData: ', rData);
  const isEdit = rData?.id;

  useEffect(() => {
    try {
      if (rData) {
        reset({
          ...rData,
          date: YYYYMMDDToJsDate(rData?.date),
          total_amount: String(rData?.amount),
          categorie_id: {
            id: rData?.category_id,
            name: rData?.category,
          },
        });
      }
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

      <View style={{ flexDirection: 'row' }}>
        <HMAButton
          leftIcon="save"
          style={{ flex: 1 }}
          title="Submit"
          onPress={handleSubmit}
        />
        {isEdit && (
          <>
            <HMADivider variant="vertical" />
            <UploadEvidence expense_id={rData?.id} />
          </>
        )}
      </View>
      <HMAModalLoader
        isVisible={isLoadingExpCategory || isLoadingExpUpdating}
      />
    </Container>
  );
}
