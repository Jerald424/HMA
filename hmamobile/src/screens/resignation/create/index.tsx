import { ScrollView } from 'react-native';
import Container from 'src/components/styled/atoms/container';
import HMAForm from 'src/components/styled/organism/form';
import useResignationCreate from './useCreateResignation';
import HMAButton from 'src/components/styled/atoms/button';
import Toast from 'src/components/styled/atoms/toast';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';

export default function ResignationDetailScreen() {
  const { control, formData, handleSubmit, toastRef } = useResignationCreate();

  return (
    <Container backgroundColor="background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HMAForm data={formData} control={control} />
      </ScrollView>
      <HMAButton title="Submit" onPress={handleSubmit} />
      <Toast ref={toastRef} showMs={10000} />
      <HMAModalLoader isVisible={false} />
    </Container>
  );
}
