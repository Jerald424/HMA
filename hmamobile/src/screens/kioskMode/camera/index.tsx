import { Image } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { colors } from 'src/theme/colors';
import { IconWithRound } from '../shutter';
import { useTheme } from 'src/hooks/useTheme';
import { useState } from 'react';

export default function CameraContainer({
  cameraRef,
  camera,
  isOn,
}: {
  cameraRef: any;
  camera: string;
  isOn: boolean;
}) {
  const back = useCameraDevice('back');
  const front = useCameraDevice('front');
  const { spacing } = useTheme();
  const [isTorchOn, setIsTorchOn] = useState(false);

  const device = camera == 'back' ? back : front;

  return (
    <>
      <Image
        source={require('src/assets/icons/qr-scan.png')}
        style={{
          height: 200,
          width: 200,
          position: 'absolute',
          tintColor: colors.primary,
          zIndex: 99,
          alignSelf: 'center',
          top: 70,
        }}
      />
      <IconWithRound
        disabled={!isOn}
        onPress={() => setIsTorchOn(prev => !prev)}
        icon={isTorchOn ? 'bolt' : 'bolt_slash'}
        iconProps={{
          variant: isTorchOn ? 'warning' : 'background',
        }}
        style={{
          position: 'absolute',
          zIndex: 99,
          right: spacing?.sm,
          top: spacing.sm,
        }}
      />
      {device && (
        <Camera
          torch={isTorchOn ? 'on' : 'off'}
          ref={cameraRef}
          photo
          style={{ flex: 1 }}
          device={device}
          isActive={isOn}
        />
      )}
    </>
  );
}
