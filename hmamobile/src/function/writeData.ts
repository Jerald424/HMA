import RNFS from 'react-native-fs';

export const saveBigData = async (data: any, name: string) => {
  const path = RNFS.DocumentDirectoryPath + `/${name}.json`;

  await RNFS.writeFile(path, JSON.stringify(data), 'utf8');
  return path;
};

export const loadBigData = async (name: string) => {
  try {
    const path = RNFS.DocumentDirectoryPath + `/${name}.json`;
    console.log('path: ', path);

    const json = await RNFS.readFile(path, 'utf8');
    if (json) return JSON.parse(json);
  } catch (error) {
    console.error(error);
  }
};
