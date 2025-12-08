import { NativeModules } from 'react-native';

const { FaceCompareModule } = NativeModules;

export type CompareResult = {
  similarity: number;
  distance: number;
  matched: boolean;
};

export async function compareFaces(
  base64A: string,
  base64B: string,
): Promise<CompareResult> {
  return FaceCompareModule.compareFaces(base64A, base64B);
}
