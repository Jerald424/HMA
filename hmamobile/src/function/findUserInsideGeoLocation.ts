// returns distance in meters between two lat/lon points
function haversineDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371000; // earth radius in meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// returns true if user is inside or on the geofence boundary
export default function isInsideGeofence(
  office: { latitude: number; longitude: number; radius: number },
  userLat: number,
  userLong: number,
) {
  const distance = haversineDistanceMeters(
    +office.latitude,
    +office.longitude,
    +userLat,
    +userLong,
  );
  return distance <= (Number(office.radius) ?? 0);
}
