import { Image } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

export default function CameraContainer() {
  const device = useCameraDevice('back');

  return (
    <>
      <Image
        source={require('src/assets/icons/qr-scan.png')}
        style={{
          height: 200,
          width: 200,
          position: 'absolute',
          tintColor: 'white',
          zIndex: 99,
          alignSelf: 'center',
          top: 50,
        }}
      />
      {device && <Camera style={{ flex: 1 }} device={device} isActive={true} />}
    </>
  );
}
