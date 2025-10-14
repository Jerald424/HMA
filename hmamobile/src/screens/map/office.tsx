import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Callout, Circle, Marker } from 'react-native-maps';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

type Office = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // meters
  color?: string; // optional brand color for the office
};

const DEFAULT_FILL_OPACITY = 0.12;

export default function OfficeCircle({ office }: { office: Office }) {
  const { colors, spacing } = useTheme();

  const center = useMemo(
    () => ({
      latitude: +office.latitude || 0,
      longitude: +office.longitude || 0,
    }),
    [office.latitude, office.longitude],
  );

  const fillColor = useMemo(
    () =>
      `${colors?.secondary}${Math.floor(DEFAULT_FILL_OPACITY * 255)
        .toString(16)
        .padStart(2, '0')}`,
    [],
  );

  return (
    <>
      <Circle
        key={office.id}
        center={center}
        radius={+office.radius}
        strokeColor={colors?.secondary}
        strokeWidth={2}
        fillColor={fillColor}
        zIndex={10}
      />
      <Marker
        coordinate={center}
        key={`${office.id}-marker`}
        tracksViewChanges={false}
      >
        <View
          style={[
            styles.markerContainer,
            {
              borderColor: colors?.border,
              backgroundColor: colors?.background,
              paddingHorizontal: spacing?.md,
            },
          ]}
        >
          <HMAText size="small">{office?.name}</HMAText>
        </View>
        <Callout tooltip>
          <View
            style={[styles.callout, { backgroundColor: colors.background }]}
          >
            <HMAText>{office.name}</HMAText>
            <HMAText size="small">{`${Math.round(
              office.radius,
            )} m radius`}</HMAText>
          </View>
        </Callout>
      </Marker>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1.5,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  callout: {
    padding: 8,
    borderRadius: 6,
    width: 150,
    alignItems: 'center',
  },
});
