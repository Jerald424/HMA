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
import { useEffect, useMemo, useRef } from 'react';

export let GEOFENCE = {
  latitude: 13.055663, // 🔹 your geofence center
  longitude: 80.253559,
  radius: 200.0, // in meters
  id: 'VICTORIA MENS PG',
};

function Map({ position }: { position: any }) {
  const { location } = useLiveLocation();
  const { data: userInfo } = useUserInfo();
  const { colors, spacing, metrics } = useTheme();
  const mapRef = useRef(null);

  const userLocation = useMemo(
    () => ({
      latitude: location?.latitude || position?.coords?.latitude || 0,
      longitude: location?.longitude || position?.coords?.longitude || 0,
    }),
    [location, position],
  );

  const topRadiusStyle = {
    borderTopEndRadius: metrics.radius.lg,
    borderTopStartRadius: metrics.radius.lg,
    overflow: 'hidden',
  } as TextStyle;
  // if (!location) return <HMAModalLoader isVisible />;

  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef?.current?.animateToRegion?.(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      ); // 1000ms animation duration
    }
  }, [userLocation]);

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
              ref={mapRef}
              style={[{ flex: 1 }]}
              initialRegion={{
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude,
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
