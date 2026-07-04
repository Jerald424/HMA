import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { IS_ANDROID } from 'src/utils/variables';

export default function useIsKeyboardIsOpened() {
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    const showEvent = IS_ANDROID ? 'keyboardDidShow' : 'keyboardWillShow';
    const hideEvent = IS_ANDROID ? 'keyboardDidHide' : 'keyboardWillHide';

    const showSubs = Keyboard.addListener(showEvent, () => {
      setIsOpened(true);
    });
    const hideSubs = Keyboard.addListener(hideEvent, () => {
      setIsOpened(false);
    });
    return () => {
      showSubs.remove();
      hideSubs.remove();
    };
  }, []);
  return isOpened;
}
