import { Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import HMAIcon, { HMAIconProps } from 'src/components/styled/atoms/icon';

export default function RotatingIcon(props: HMAIconProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000, // 1 second per spin
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <HMAIcon {...props} />
    </Animated.View>
  );
}
