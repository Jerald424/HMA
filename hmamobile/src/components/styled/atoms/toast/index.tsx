import { View } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import HMAText from '../text';
import { Ref, useEffect, useImperativeHandle, useState } from 'react';
import { colors } from 'src/theme/colors';

type colorKey = keyof typeof colors;
export type toastRefFn = {
  showToast?: (msg: string, type?: colorKey) => void;
};

type toastRefProps = Ref<toastRefFn>;
interface ToastProps {
  ref?: toastRefProps;
  isVisible?: boolean;
  text?: string;
  showMs?: number;
}
export default function Toast({ showMs = 4000, ...props }: ToastProps) {
  const { spacing, colors } = useTheme();
  const [message, setMessage] = useState('');
  const [isShowTimer, setIsShowTimer] = useState(false);
  const [color, setColor] = useState<colorKey>('info');

  useImperativeHandle(props?.ref, () => ({
    showToast: (msg?: string, type?: colorKey) => {
      msg && setMessage(msg);
      setColor(type ?? 'info');

      setIsShowTimer(true);
    },
  }));

  useEffect(() => {
    setMessage(props?.text || '');
  }, [props?.text]);

  useEffect(() => {
    if (isShowTimer) {
      setTimeout(() => {
        setIsShowTimer(false);
      }, showMs);
    }
  }, [isShowTimer]);

  if (props?.isVisible || isShowTimer)
    return (
      <View
        style={{
          padding: spacing.xs,
          backgroundColor: colors[color],
          position: 'absolute',
          zIndex: 99,
          width: '100%',
        }}
      >
        <HMAText color="background" align="center" size="small">
          {message}
        </HMAText>
      </View>
    );
}
