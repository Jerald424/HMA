import { Alert } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import useIOSCameraVerify from 'src/function/IOSCameraVerify';

export default function TestScreen() {
  const { onCamera } = useIOSCameraVerify({
    onVerified: () => {
      Alert.alert('VERIFY DONE');
    },
  });
  return (
    <Container>
      <HMAButton title="TEST" onPress={onCamera} />
    </Container>
  );
}
