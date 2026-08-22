import React, { ReactNode, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HMAText from '../text';

export type AccordionProps = {
  title: ReactNode;
  children: ReactNode;
  initiallyOpen?: boolean;
};

const HMAAccordion = ({
  title,
  children,
  initiallyOpen = false,
}: AccordionProps) => {
  const [open, setOpen] = useState(initiallyOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const progress = useRef(new Animated.Value(initiallyOpen ? 1 : 0)).current;

  const toggle = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    Animated.timing(progress, {
      toValue: nextOpen ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const onContentLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    if (height !== contentHeight) setContentHeight(height);
  };

  const height = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={toggle}
        style={styles.header}
        activeOpacity={0.7}
      >
        <View style={styles.title}>
          <HMAText>{title}</HMAText>
        </View>
        <Text style={styles.indicator}>{open ? '−' : '+'}</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.content, { opacity: progress }]}>
        {open && <View onLayout={onContentLayout}>{children}</View>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 48,
  },
  title: { flex: 1 },
  indicator: { fontSize: 24, marginLeft: 12 },
  content: { overflow: 'hidden' },
});

export default HMAAccordion;
