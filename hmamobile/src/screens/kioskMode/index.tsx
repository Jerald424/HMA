import { useEffect } from 'react';
import { View } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import CameraContainer from './camera';
import Permission from './permission';
import Shutter from './shutter';

export default function KioskAttendanceMode() {
  const { colors, spacing, metrics } = useTheme();
  const { requestPermission, hasPermission } = useCameraPermission();

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Container
      padding={0}
      backgroundColor="background"
      safeAreaViewProps={{ edges: ['top', 'left', 'right'] }}
    >
      <HMADivider />
      <View
        style={[
          {
            flex: 1,
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <HMAText
            style={{ padding: spacing.md }}
            align="center"
            size="large"
            color="textPrimary"
          >
            Kiosk Attendance
          </HMAText>
          <View style={[{ flex: 1 }]}>
            {hasPermission ? <CameraContainer /> : <Permission />}
          </View>
        </View>
        <View
          style={[
            {
              padding: spacing.md,
            },
          ]}
        >
          <Shutter />
        </View>
      </View>
    </Container>
  );
}
