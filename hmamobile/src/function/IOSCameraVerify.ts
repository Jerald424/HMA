import { NativeModules } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useAuth, useUserInfo } from 'src/redux/hooks';

const { FaceRecognition } = NativeModules;

export default function useIOSCameraVerify({
  onVerified,
}: {
  onVerified: (emp: any) => void;
}) {
  const { baseurl } = useAuth();
  const { data: userInfo } = useUserInfo();

  const onCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      for (let x = 1; x <= 4; x++) {
        const result = await FaceRecognition.compare(
          `${baseurl}${userInfo?.Employee_Image_URL}&${Date.now()}`,
          image.path,
          x,
        );
        if (+result?.score > 0.5) {
          onVerified?.(result);
        }
      }
    });
  };

  return {
    onCamera,
  };
}
