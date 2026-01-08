import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import HMAModalOrganism from '../styled/organism/modal';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { View } from 'react-native';
import { SCREEN_HEIGHT } from 'src/utils/variables';
import Shutter from 'src/screens/kioskMode/shutter';
import { useTheme } from 'src/hooks/useTheme';
import FaceNet from 'src/native/FaceNet';
import { useUserInfo } from 'src/redux/hooks';
import Toast, { toastRefFn } from '../styled/atoms/toast';
import HMAButton from '../styled/atoms/button';
import HMADivider from '../styled/atoms/divider';
import HMAText from '../styled/atoms/text';
import { openSettings } from 'react-native-permissions';
import { makeErrorVibration } from 'src/utils/vibration';

export type faceVerifyRefProp = {
  onVerify: () => void;
};

interface FaceVerifyProps {
  ref: React.Ref<faceVerifyRefProp>;
  onVerified: (emp: any) => void;
}

export default function FaceVerify({ ref, onVerified }: FaceVerifyProps) {
  const { spacing } = useTheme();
  const cameraRef = useRef<Camera>(null);
  const [camera, setCamera] = useState('front');
  const [isOn, setIsOn] = useState(true);
  const { data: userInfo } = useUserInfo();
  const toastRef = useRef<toastRefFn>(null);

  const { requestPermission, hasPermission } = useCameraPermission();
  const back = useCameraDevice('back');
  const front = useCameraDevice('front');
  const isFront = camera == 'front';

  const [isOpen, setIsOpen] = useState(false);
  const device = camera == 'back' ? back : front;

  const onToggleCamera = () => {
    setIsOpen(true);
  };

  const onShutter = async () => {
    try {
      toastRef?.current?.showToast?.('Loading', 'info');
      const photo = await cameraRef?.current?.takePhoto?.({
        enableShutterSound: true,
      });
      const response = await FaceNet.compareCapturedFace(
        photo?.path,
        1,
        isFront ? 270 : 0,
      );
      if (
        response &&
        response?.[0]?.score >= 0.6 &&
        response?.[0]?.id == userInfo?.Employee_ID
      ) {
        onVerified(response?.[0]);
        toastRef?.current?.showToast?.('Verified Successful', 'success');
        setTimeout(() => setIsOpen(false), 1000);
      } else {
        makeErrorVibration();
        toastRef?.current?.showToast?.('Face does not match', 'error');
      }
    } catch (error) {
      makeErrorVibration();

      toastRef?.current?.showToast?.(error?.message, 'error');

      console.error(error);
    }
  };

  useImperativeHandle(ref, () => ({
    onVerify: onToggleCamera,
  }));

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <HMAModalOrganism
        isVisible={isOpen}
        headingProps={{
          children: isFront ? 'Rotate phone and capture' : 'Verify Face',
        }}
      >
        <View style={{ height: SCREEN_HEIGHT / 2 }}>
          <Toast ref={toastRef} />

          {device && hasPermission ? (
            <>
              <Camera
                ref={cameraRef}
                photo
                style={{ flex: 1 }}
                device={device}
                isActive={isOn}
              />
              <Shutter
                style={[
                  {
                    position: 'absolute',

                    padding: spacing.sm,
                    bottom: 0,
                  },
                ]}
                setCamera={setCamera}
                onShutter={onShutter}
                isLoading={false}
                isOn={isOn}
                setIsOn={setIsOn}
              />
            </>
          ) : (
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <HMAText align="center">Please enable camera permission</HMAText>
              <HMADivider />
              <HMAText
                onPress={() => openSettings()}
                variant="title"
                color="textSecondary"
                style={{ textDecorationLine: 'underline' }}
                align="center"
              >
                Open Settings
              </HMAText>
            </View>
          )}
        </View>
        <HMADivider />
        <HMAButton
          color="error"
          onPress={() => setIsOpen(false)}
          title="Cancel"
        />
      </HMAModalOrganism>
    </>
  );
}
