import { useNavigation } from '@react-navigation/native';
import { openSettings } from 'react-native-permissions';
import HMAModalOrganism, {
  HMAModalOrganismProps,
} from 'src/components/styled/organism/modal';

export default function AskPermissionModal({
  onPermissionEnabled,
  type = 'location',
  ...props
}: {
  onPermissionEnabled?: () => void;
  type?: 'location' | 'camera';
} & HMAModalOrganismProps) {
  const navigation = useNavigation();
  const str = {
    location: 'Location',
    camera: 'Camera',
  }[type];
  return (
    <HMAModalOrganism
      {...props}
      avatarProps={{ source: require('src/assets/color-icons/gps.png') }}
      headingProps={{
        children: `Enable ${str} Permission`,
      }}
      descriptionProps={{
        children: `Please enable ${str?.toLocaleLowerCase()} permission in app settings to proceed`,
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
