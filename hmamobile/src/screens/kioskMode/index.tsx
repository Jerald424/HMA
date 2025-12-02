import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

const Tab = createBottomTabNavigator();

export default function KioskAttendanceMode() {
  const device = useCameraDevice('back');

  const { colors, spacing } = useTheme();

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
            <Image
              source={require('src/assets/icons/qr-scan.png')}
              style={{
                height: 200,
                width: 200,
                position: 'absolute',
                tintColor: 'white',
                // top: 100,
                zIndex: 99,
                alignSelf: 'center',
                top: 50,
              }}
            />
            {device && (
              <Camera style={{ flex: 1 }} device={device} isActive={true} />
            )}
          </View>
        </View>
        <View
          style={[
            {
              padding: spacing.md,
            },
          ]}
        >
          <View
            style={{
              padding: 2,
              borderWidth: 4,
              borderRadius: 50,
              borderColor: 'red',
              alignSelf: 'center',
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: 'red',
                borderRadius: 50,
              }}
            />
          </View>
        </View>
      </View>
    </Container>
  );
}
