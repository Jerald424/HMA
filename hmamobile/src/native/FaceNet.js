// js/native/FaceNet.js
import { NativeModules } from "react-native";
const { FaceNetNative } = NativeModules;

export default {
  // employees: [{id, name, image: base64}, ...]
  initializeEmployees: (employees) => FaceNetNative.initializeEmployees(employees),

  // base64: captured image string
  // topN: optional number of results
  compareCapturedFace: (base64, topN = 10) =>
    FaceNetNative.compareCapturedFace(base64, topN),
};
