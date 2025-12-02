import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import LocationPermissionModal from 'src/components/layout/askPermissionModal';
import HMAModalOrganism from 'src/components/styled/organism/modal';
import {
  checkLocationEnabled,
  ensureLocationPermission,
} from 'src/function/locationPermission';

export default function withLocation(Cmp: any) {
  return (props: any) => {
    const navigation = useNavigation();
    const [isPermissionEnabled, setIsPermissionEnabled] = useState(false);
    const [isLocationOff, setIsLocationOff] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState<any>();

    const fetchPermission = async () => {
      const isEnabled = await ensureLocationPermission();

      if (isEnabled) onCheckLocationOn();
      setIsPermissionEnabled(isEnabled);
    };

    const onCheckLocationOn = () => {
      setIsLoading(true);
      setIsLocationOff(false);
      checkLocationEnabled()
        .then(position => {
          setIsLocationOff(false);
          setPosition(position);
        })
        .catch(() => setIsLocationOff(true))
        .finally(() => setIsLoading(false));
    };

    useEffect(() => {
      fetchPermission();
    }, []);

    // if (isLoading) return <HMAModalLoader isVisible />;
    if (!isPermissionEnabled)
      return (
        <LocationPermissionModal
          isVisible
          onPermissionEnabled={fetchPermission}
        />
      );

    if (isLocationOff)
      return (
        <HMAModalOrganism
          isVisible
          avatarProps={{ source: require('src/assets/color-icons/gps.png') }}
          headingProps={{
            children: 'Turn On Location !',
          }}
          descriptionProps={{
            children: 'Please Enable location in mobile to proceed',
          }}
          okTextProps={{
            children: 'Check',
            onPress: onCheckLocationOn,
          }}
          cancelTextProps={{
            children: 'Go Back',
            onPress: navigation.goBack,
          }}
        />
      );
    return <Cmp {...props} position={position} />;
  };
}
