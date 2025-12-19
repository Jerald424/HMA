// js/native/FaceNet.js
import { NativeModules } from 'react-native';
import { IS_ANDROID } from 'src/utils/variables';

export default {
  // employees: [{id, name, image: base64}, ...]
  initializeEmployees: employees =>
    IS_ANDROID
      ? NativeModules.FaceNetNative.initializeEmployees(employees)
      : NativeModules.FaceRecognition.registerEmployees(employees),

  // base64: captured image string
  // topN: optional number of results
  compareCapturedFace: (base64, topN = 10) =>
    IS_ANDROID
      ? NativeModules.FaceNetNative.compareCapturedFace(base64, topN)
      : NativeModules.FaceRecognition.faceCompare(base64),
};
