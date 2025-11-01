import { TextStyle, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import withLocation from 'src/hoc/withLocation';
import useLiveLocation from 'src/hooks/useLiveLocation';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import FooterBtn from './footer';
import Header from './header';
import OfficeCircle from './office';
import HMAText from 'src/components/styled/atoms/text';
import HMALoader from 'src/components/styled/atoms/loader';

export let GEOFENCE = {
  latitude: 13.055663, // 🔹 your geofence center
  longitude: 80.253559,
  radius: 200.0, // in meters
  id: 'VICTORIA MENS PG',
};

function Map() {
  const { location } = useLiveLocation();
  const { data: userInfo } = useUserInfo();
  const { colors, spacing, metrics } = useTheme();

  const userLocation = {
    latitude: location?.latitude || 0,
    longitude: location?.longitude || 0,
  };
  const topRadiusStyle = {
    borderTopEndRadius: metrics.radius.lg,
    borderTopStartRadius: metrics.radius.lg,
    overflow: 'hidden',
  } as TextStyle;
  // if (!location) return <HMAModalLoader isVisible />;
  return (
    <Container
      padding={0}
      backgroundColor="lightBackground"
      safeAreaViewProps={{ edges: ['top', 'left', 'right'] }}
    >
      <HMADivider />
      <View
        style={[
          {
            flex: 1,
            backgroundColor: colors.background,
            marginHorizontal: spacing.sm,
          },
          topRadiusStyle,
        ]}
      >
        <View style={{ flex: 1 }}>
          <Header />

          <View style={[{ flex: 1 }, topRadiusStyle]}>
            <MapView
              style={[{ flex: 1 }]}
              initialRegion={{
                latitude: location?.latitude || 0,
                longitude: location?.longitude || 0,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                key="user-marker"
                coordinate={userLocation}
                anchor={{ x: 0.5, y: 0.5 }}
                tracksViewChanges={false}
              />
              {userInfo?.offices?.map(office => (
                <OfficeCircle
                  key={office?.id}
                  office={{
                    id: office?.id,
                    latitude: office?.lat,
                    longitude: office?.long,
                    name: office?.name,
                    radius: office?.radius,
                  }}
                />
              ))}
            </MapView>
            {!location && (
              <HMALoader
                style={{ position: 'absolute', margin: spacing.md, right: 0 }}
              />
            )}
          </View>
        </View>
        <FooterBtn userLocation={userLocation} />
      </View>
    </Container>
  );
}

export default withLocation(Map);
