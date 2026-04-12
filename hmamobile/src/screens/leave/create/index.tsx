import Container from 'src/components/styled/atoms/container';
import useCreate from './useCreate';
import HMAForm from 'src/components/styled/organism/form';
import { ScrollView } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';

export default function LeaveCreate() {
  const { formData, control, handleSubmit } = useCreate();
  return (
    <Container backgroundColor="background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HMAForm data={formData} control={control} />
      </ScrollView>
      <HMAButton title="Submit" onPress={handleSubmit} />
    </Container>
  );
}
