import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ITEM_PER_INIT } from 'src/utils/variables';

export default function useItemPerCount() {
  const [itemPerInit, setItemPerInit] = useState(50);

  const updateCount = async (count: number) => {
    setItemPerInit(count);
    await AsyncStorage.setItem(ITEM_PER_INIT, JSON.stringify(count));
  };

  useEffect(() => {
    const load = async () => {
      let count = await AsyncStorage.getItem(ITEM_PER_INIT);
      if (count) {
        count = JSON.parse(count);
        setItemPerInit(count);
      }
    };
    load();
  }, []);

  return { itemPerInit, setItemPerInit: updateCount };
}
