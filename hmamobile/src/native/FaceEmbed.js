import { NativeModules } from "react-native";

const { FaceEmbed } = NativeModules;
console.log('FaceEmbed: ', FaceEmbed);

export const getEmbedding = async (base64) => {
  const raw = await FaceEmbed.getEmbedding(base64);
  return raw.split(",").map(Number);
};
