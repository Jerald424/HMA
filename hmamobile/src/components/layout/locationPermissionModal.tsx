import { useNavigation } from '@react-navigation/native';
import { openSettings } from 'react-native-permissions';
import HMAModalOrganism, {
  HMAModalOrganismProps,
} from 'src/components/styled/organism/modal';

export default function LocationPermissionModal({
  onPermissionEnabled,
  ...props
}: { onPermissionEnabled?: () => void } & HMAModalOrganismProps) {
  const navigation = useNavigation();
  return (
    <HMAModalOrganism
      {...props}
      avatarProps={{ source: require('src/assets/color-icons/gps.png') }}
      headingProps={{
        children: 'Enable Location Permission',
      }}
      descriptionProps={{
        children:
          'Please Enable location permission in app settings to proceed',
      }}
      okTextProps={{
        children: 'Open Settings',
        onPress: () => {
          openSettings();
          setTimeout(() => {
            onPermissionEnabled?.();
          }, 1000);
        },
      }}
      cancelTextProps={{
        children: 'Go Back',
        onPress: navigation.goBack,
      }}
    />
  );
}
