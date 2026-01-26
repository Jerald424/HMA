import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import HMAModalOrganism from '../styled/organism/modal';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { NativeModules, View } from 'react-native';
import { IS_ANDROID, SCREEN_HEIGHT } from 'src/utils/variables';
import Shutter from 'src/screens/kioskMode/shutter';
import { useTheme } from 'src/hooks/useTheme';
import FaceNet from 'src/native/FaceNet';
import { useAuth, useUserInfo } from 'src/redux/hooks';
import Toast, { toastRefFn } from '../styled/atoms/toast';
import HMAButton from '../styled/atoms/button';
import HMADivider from '../styled/atoms/divider';
import HMAText from '../styled/atoms/text';
import { openSettings } from 'react-native-permissions';
import { makeErrorVibration } from 'src/utils/vibration';
import { blendWithWhite } from 'src/function/colorCorrection';
import { colors } from 'src/theme/colors';

const { FaceRecognition } = NativeModules;

export type faceVerifyRefProp = {
  onVerify: () => void;
};

interface FaceVerifyProps {
  ref: React.Ref<faceVerifyRefProp>;
  onVerified: (emp?: any) => void;
}
const rotation = [0, 90, 180, 270];
const getImageResult = async (photo?: PhotoFile) => {
  for (let x = 0; x < 4; x++) {
    try {
      const response = await FaceNet.compareCapturedFace(
        photo?.path,
        1,
        rotation?.[x],
      );
      console.log('response: ', rotation[x], response);
      if (response && response?.[0]?.score >= 0.6) {
        return response;
      }
    } catch (error) {
      console.log('ERROR', rotation[x]);
      continue;
    }
  }
};

export default function FaceVerify({ ref, onVerified }: FaceVerifyProps) {
  const { spacing } = useTheme();
  const cameraRef = useRef<Camera>(null);
  const [camera, setCamera] = useState('front');
  const [isOn, setIsOn] = useState(true);
  const { data: userInfo } = useUserInfo();
  const toastRef = useRef<toastRefFn>(null);
  const { baseurl } = useAuth();

  const { requestPermission, hasPermission } = useCameraPermission();
  const back = useCameraDevice('back');
  const front = useCameraDevice('front');
  const isFront = camera == 'front';

  const [isOpen, setIsOpen] = useState(false);
  const device = camera == 'back' ? back : front;

  const onToggleCamera = () => {
    setIsOpen(true);
  };

  const onVerifySuccess = () => {
    onVerified();
    toastRef?.current?.showToast?.('Verified Successful', 'success');
    setTimeout(() => setIsOpen(false), 1000);
  };

  const onVerifyError = () => {
    makeErrorVibration();
    toastRef?.current?.showToast?.('Face does not match', 'error');
  };

  const androidVerify = async ({ photo }: { photo: any }) => {
    const response = isFront
      ? await getImageResult(photo)
      : await FaceNet.compareCapturedFace(photo?.path, 1, 0);
    if (
      response &&
      response?.[0]?.score >= 0.6 &&
      response?.[0]?.id == userInfo?.Employee_ID
    ) {
      onVerifySuccess();
    } else {
      onVerifyError();
    }
  };

  const iosVerify = async ({ photo }: { photo: any }) => {
    const result = await FaceRecognition.compare(
      photo?.path,
      `${baseurl}${userInfo?.Employee_Image_URL}&${Date.now()}`,
    );
    if (+result?.score > 0.5) {
      onVerifySuccess();
    } else onVerifyError();
  };

  const onShutter = async () => {
    try {
      toastRef?.current?.showToast?.('Loading', 'info');
      const photo = await cameraRef?.current?.takePhoto?.({
        enableShutterSound: true,
      });

      console.log('photo:', photo?.orientation, photo?.metadata);
      if (IS_ANDROID) await androidVerify({ photo });
      else await iosVerify({ photo });
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
          children: 'Verify Face',
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
        <View
          style={{
            backgroundColor: blendWithWhite(colors.info, 0.8),
            padding: spacing.xs,
          }}
        >
          <HMAText align="center" size="small" color="info" variant="large">
            Tap and hold the shutter to start the timer
          </HMAText>
        </View>

        <HMAButton
          color="error"
          onPress={() => setIsOpen(false)}
          title="Cancel"
        />
      </HMAModalOrganism>
    </>
  );
}
