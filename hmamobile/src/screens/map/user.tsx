import { MapMarkerProps, Marker } from 'react-native-maps';
import HMAIcon from 'src/components/styled/atoms/icon';

export default function UserIcon({ ...props }: MapMarkerProps) {
  return (
    <Marker
      key="user-marker"
      anchor={{ x: 0.5, y: 0.5 }}
      tracksViewChanges={false}
      {...props}
    >
      <HMAIcon name="person" size="lg" />
    </Marker>
  );
}
