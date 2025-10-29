import { useUserInfo } from 'src/redux/hooks';

export default function useGeofenceRestriction() {
  const { data: userInfo } = useUserInfo();

  return {
    no_geofence_restriction: userInfo?.no_geofence_restriction,
    no_geofence_restriction_default_project_id:
      userInfo?.no_geofence_restriction_default_project_id,
    no_geofence_restriction_default_project_name:
      userInfo?.no_geofence_restriction_default_project_name,
  };
}
