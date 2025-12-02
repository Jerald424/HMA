import { useState } from 'react';
import { Image, View } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import AskPermissionModal from 'src/components/layout/askPermissionModal';
import HMAButton from 'src/components/styled/atoms/button';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

export default function Permission() {
  const { colors, spacing, metrics } = useTheme();
  const { requestPermission, hasPermission } = useCameraPermission();

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.lightBackground,
          margin: spacing.md,
          borderRadius: metrics.radius.md,
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('src/assets/color-icons/camera.png')}
          style={{ height: 100, width: 100, alignSelf: 'center' }}
        />
        <HMADivider />
        <HMAText align="center">Please enable camera permission</HMAText>
        <HMADivider />

        <HMAButton
          onPress={requestPermission}
          title="Enable"
          style={{ alignSelf: 'center' }}
        />
      </View>
      <AskPermissionModal isVisible={!hasPermission} />
    </>
  );
}
