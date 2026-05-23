import Container from 'src/components/styled/atoms/container';
import useCreate from './useCreate';
import HMAForm from 'src/components/styled/organism/form';
import { ScrollView } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import Toast from 'src/components/styled/atoms/toast';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';

export default function LeaveCreate() {
  const { formData, control, handleSubmit, toastRef, isLoading } = useCreate();
  return (
    <Container backgroundColor="background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HMAForm data={formData} control={control} />
      </ScrollView>
      <HMAButton title="Submit" onPress={handleSubmit} />
      <Toast ref={toastRef} showMs={10000} />
      <HMAModalLoader isVisible={isLoading} />
    </Container>
  );
}
