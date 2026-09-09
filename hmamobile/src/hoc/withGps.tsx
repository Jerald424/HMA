import { useEffect, useState } from 'react';
import { ensureLocationPermission } from 'src/function/locationPermission';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import { Alert } from 'react-native';
import LocationPermissionModal from 'src/components/layout/locationPermissionModal';

const INTERVAL = 60000;
export default function withGPS(Cmp: any) {
  return (props: any) => {
    const [isPermissionEnabled, setIsPermissionEnabled] = useState(false);

    const fetchPermission = async () => {
      try {
        console.log('PERMISSION FETCH: ');
        const isEnabled = await ensureLocationPermission();
        if (isEnabled) {
          await promptForEnableLocationIfNeeded();
        }
        setIsPermissionEnabled(isEnabled);
      } catch (error) {
        fetchPermission();
      }
    };
    useEffect(() => {
      fetchPermission();
      const interval = setInterval(() => {
        fetchPermission();
      }, INTERVAL);
      return () => clearInterval(interval);
    }, []);

    if (!isPermissionEnabled)
      return (
        <LocationPermissionModal
          isVisible
          onPermissionEnabled={fetchPermission}
        />
      );

    return <Cmp {...props} />;
  };
}
