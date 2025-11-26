import { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import HMABottomSheet from 'src/components/styled/atoms/bottomSheet';
import HMACheckBox from 'src/components/styled/atoms/checkbox';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';
import { SCREEN_HEIGHT } from 'src/utils/variables';
import useGeofenceRestriction from '../../hooks/useGeofenceRestriction';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import HMABadge from 'src/components/styled/atoms/badge';
import HMAButton from 'src/components/styled/atoms/button';
import InOutButton from '../components/inOutButton';

export default function OfficeList({
  officesRef,
  matchedOffice,
  isIn,
  onAttendance,
}: {
  officesRef: any;
  matchedOffice: any;
  isIn?: boolean;
  onAttendance: (arg?: { project_id: number }) => void;
}) {
  const { spacing, colors, metrics } = useTheme();
  const { data: userInfo } = useUserInfo();
  const [selectedProjectId, setSelectedProjectId] = useState();

  const {
    no_geofence_restriction,
    no_geofence_restriction_default_project_id,
    no_geofence_restriction_default_project_name,
  } = useGeofenceRestriction();

  const offices = useMemo(() => {
    try {
      const off = [];
      const staticAddedIds: number[] = [];
      if (!!no_geofence_restriction_default_project_id) {
        off?.push({
          id: '',
          name: no_geofence_restriction_default_project_name,
          project: { id: no_geofence_restriction_default_project_id },
        });
        staticAddedIds.push(no_geofence_restriction_default_project_id);
      }

      if (!!matchedOffice) off?.push(matchedOffice);
      else if (!!no_geofence_restriction && isArray(userInfo?.offices))
        off?.push(
          ...cloneDeep(
            userInfo?.offices?.filter(
              (office: any) => !staticAddedIds?.includes?.(office?.project?.id),
            ),
          ),
        );
      // else if (!!matchedOffice) off?.push(matchedOffice);
      if (!!matchedOffice)
        off?.sort((a, b) => {
          const aIsMatch = a?.project?.id == matchedOffice?.project?.id;
          const bIsMatch = b?.project?.id == matchedOffice?.project?.id;
          return (bIsMatch ? 1 : 0) - (aIsMatch ? 1 : 0);
        });

      return off;
    } catch (error) {
      console.error(error);
    }
  }, [userInfo, matchedOffice]);

  const handlePress = () => {
    onAttendance({ project_id: selectedProjectId });
    officesRef?.current?.close?.();
  };

  useEffect(() => {
    if (matchedOffice || no_geofence_restriction_default_project_id)
      setSelectedProjectId(
        matchedOffice?.project?.id ??
          no_geofence_restriction_default_project_id,
      );
  }, [matchedOffice, no_geofence_restriction_default_project_id]);

  return (
    <HMABottomSheet
      ref={officesRef}
      customStyles={{ container: { height: 'auto' } }}
    >
      <View style={{ padding: spacing?.md, maxHeight: SCREEN_HEIGHT - 100 }}>
        <HMAText size="large">Offices</HMAText>
        <HMADivider thickness={1} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {offices?.map((office: any) => (
            <SepProject
              matchedOffice={matchedOffice}
              setSelectedProjectId={setSelectedProjectId}
              selectedProjectId={selectedProjectId}
              office={office}
              key={office?.id}
              no_geofence_restriction_default_project_id={
                no_geofence_restriction_default_project_id
              }
            />
          ))}
        </ScrollView>
        {selectedProjectId && <InOutButton onPress={handlePress} isIn={isIn} />}
      </View>
    </HMABottomSheet>
  );
}

const SepProject = ({
  office,
  matchedOffice,
  no_geofence_restriction_default_project_id,
  setSelectedProjectId,
  selectedProjectId,
}: {
  office: any;
  matchedOffice: any;
  no_geofence_restriction_default_project_id: boolean;
  selectedProjectId?: number;
  setSelectedProjectId: any;
}) => {
  const { spacing, colors, metrics } = useTheme();
  const isInside = matchedOffice?.project?.id == office?.project?.id;
  const isDefault =
    no_geofence_restriction_default_project_id == office?.project?.id;

  return (
    <>
      <TouchableOpacity
        onPress={() => setSelectedProjectId(office?.project?.id)}
        style={[
          cStyle.rowAlign,
          {
            padding: spacing.md,
          },
        ]}
      >
        <HMACheckBox isRadio value={selectedProjectId == office?.project?.id} />
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <HMAText>{office?.name}</HMAText>
          {isInside && (
            <>
              <HMADivider />
              <HMABadge label={'INSIDE'} color="success" />
            </>
          )}
          {isDefault && (
            <>
              <HMADivider />
              <HMABadge label={'DEFAULT'} color="success" />
            </>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};
