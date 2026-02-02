import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { View, NativeModules, Dimensions } from 'react-native';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import HMAModalOrganism from '../styled/organism/modal';
import Shutter from 'src/screens/kioskMode/shutter';
import { useTheme } from 'src/hooks/useTheme';
import { useAuth, useUserInfo } from 'src/redux/hooks';
import { IS_ANDROID, SCREEN_HEIGHT } from 'src/utils/variables';
import FaceNet from 'src/native/FaceNet';

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

/**
 * ✅ iOS orientation mapping
 * 1 = portrait
 * 3 = landscape-left
 */
const getDeviceOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return height >= width ? 1 : 3;
};

export default function FaceVerify({ ref, onVerified }: FaceVerifyProps) {
  const { spacing } = useTheme();
  const cameraRef = useRef<Camera>(null);
  const toastRef = useRef<toastRefFn>(null);

  const [camera, setCamera] = useState<'front' | 'back'>('front');
  const [isOn, setIsOn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { data: userInfo } = useUserInfo();
  const { baseurl } = useAuth();

  const { requestPermission, hasPermission } = useCameraPermission();
  const back = useCameraDevice('back');
  const front = useCameraDevice('front');
  const device = camera === 'back' ? back : front;
  const isFront = camera === 'front';

  // -------------------------
  // UI handlers
  // -------------------------
  const onToggleCamera = () => setIsOpen(true);

  const onVerifySuccess = () => {
    onVerified();
    toastRef.current?.showToast?.('Verified Successful', 'success');
    setTimeout(() => setIsOpen(false), 1000);
  };

  const onVerifyError = () => {
    makeErrorVibration();
    toastRef.current?.showToast?.('Face does not match', 'error');
  };

  // -------------------------
  // iOS Face Verify (FIXED)
  // -------------------------
  const getImageResult = async (photo?: PhotoFile) => {
    if (!photo?.path) return null;

    try {
      if (!IS_ANDROID) {
        const result = await FaceRecognition.compare(
          `${baseurl}${userInfo?.Employee_Image_URL}&${Date.now()}`,
          photo.path,
          getDeviceOrientation()
        );
        return result;
      }

      // Android (unchanged)
      return await FaceNet.compareCapturedFace(photo.path, 1, 0);
    } catch (error) {
      console.log('Face compare error:', error);
      return null;
    }
  };

  const androidVerify = async ({ photo }: { photo: PhotoFile }) => {
    const response = isFront
      ? await getImageResult(photo)
      : await FaceNet.compareCapturedFace(photo.path, 1, 0);

    if (
      response &&
      response?.[0]?.score >= 0.6 &&
      response?.[0]?.id === userInfo?.Employee_ID
    ) {
      onVerifySuccess();
    } else {
      onVerifyError();
    }
  };

  const iosVerify = async ({ photo }: { photo: PhotoFile }) => {
    const result = await getImageResult(photo);
    if (+result?.score > 0.5) {
      onVerifySuccess();
    } else {
      onVerifyError();
    }
  };

  // -------------------------
  // Capture
  // -------------------------
  const onShutter = async () => {
    try {
      toastRef.current?.showToast?.('Loading', 'info');

      const photo = await cameraRef.current?.takePhoto({
        enableShutterSound: true,
      });

      if (!photo) return;

      if (IS_ANDROID) {
        await androidVerify({ photo });
      } else {
        await iosVerify({ photo });
      }
    } catch (error: any) {
      makeErrorVibration();
      toastRef.current?.showToast?.(error?.message ?? 'Error', 'error');
      console.error(error);
    }
  };

  // -------------------------
  // Ref exposure
  // -------------------------
  useImperativeHandle(ref, () => ({
    onVerify: onToggleCamera,
  }));

  useEffect(() => {
    requestPermission();
  }, []);

  // -------------------------
  // UI
  // -------------------------
  return (
    <>
      <HMAModalOrganism
        isVisible={isOpen}
        headingProps={{ children: 'Verify Face' }}
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
                style={{
                  position: 'absolute',
                  padding: spacing.sm,
                  bottom: 0,
                }}
                setCamera={setCamera}
                onShutter={onShutter}
                isLoading={false}
                isOn={isOn}
                setIsOn={setIsOn}
              />
            </>
          ) : (
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <HMAText align="center">
                Please enable camera permission
              </HMAText>
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
