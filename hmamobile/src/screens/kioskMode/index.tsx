import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Camera, useCameraPermission } from 'react-native-vision-camera';
import Header from 'src/components/layout/header';
import Container from 'src/components/styled/atoms/container';
import { useTheme } from 'src/hooks/useTheme';
import CameraContainer from './camera';
import Permission from './permission';
import Shutter from './shutter';
import { useLandingContext } from '../landing/context';

export default function KioskAttendanceMode() {
  const { colors, spacing, metrics } = useTheme();
  const { requestPermission, hasPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);
  const [isTaking, setIsTaking] = useState(false);
  const { onAttendance } = useLandingContext();
  const [camera, setCamera] = useState('back');
  const [isOn, setIsOn] = useState(true);

  const onShutter = async () => {
    setIsTaking(true);
    const photo = await cameraRef?.current?.takePhoto?.();
    setIsTaking(false);
    onAttendance();
    console.log('photo: ', photo);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Container
      padding={0}
      backgroundColor="background"
      safeAreaViewProps={{ edges: ['top', 'left', 'right'] }}
    >
      <View
        style={[
          {
            flex: 1,
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Header title="Kiosk " />
          <View style={[{ flex: 1 }]}>
            {hasPermission ? (
              <CameraContainer
                isOn={isOn}
                camera={camera}
                cameraRef={cameraRef}
              />
            ) : (
              <Permission />
            )}
          </View>
        </View>
        <View
          style={[
            {
              padding: spacing.md,
            },
          ]}
        >
          <Shutter
            setCamera={setCamera}
            onShutter={onShutter}
            isLoading={isTaking}
            isOn={isOn}
            setIsOn={setIsOn}
          />
        </View>
      </View>
    </Container>
  );
}
