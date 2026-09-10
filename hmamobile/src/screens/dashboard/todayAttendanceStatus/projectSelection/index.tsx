import { useImperativeHandle, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import HMAModalOrganism from 'src/components/styled/organism/modal';
import { formatAttendanceDate } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import axiosInstance from 'src/services/axiosInstance';

export type ProjectSelectionRefProp = {
  onCheckInOut: (arg: 'in' | 'out') => void;
};

// “Params”:{
// 	“type”: “in” | ”out”,
// 	“date”: “03:09:2026 09:02:14”,
// 	“Project_id”: 1441,           // Optional
// 	“Latitude”: 25.276987,     // Optional
// 	“Longitude”: 55.296249   // Optional
// }

const markAtt = async (payload: any) => {
  return await axiosInstance.post('/api/employee/attendance/mark', {
    ...payload,
    date: formatAttendanceDate(),
  });
};
export default function ProjectSelection({
  matchedOffice,
  ref,
}: {
  matchedOffice: any;
  ref?: React.RefObject<ProjectSelectionRefProp | null>;
}) {
  const [state, setState] = useState<'in' | 'out'>();
  const [selectedOffice, setSelectedOffice] = useState<any>();
  const { colors } = useTheme();

  const handleOpenModal = (type: 'in' | 'out') => {
    const office = matchedOffice?.[0];

    setState(type);
    setSelectedOffice(office);
  };

  const handleCloseModal = () => {
    setState(undefined);
    setSelectedOffice(undefined);
  };

  const handleConfirm = async () => {
    if (!state || !selectedOffice) {
      return;
    }

    await markAtt({
      type: state,
      Project_id: selectedOffice?.project?.id ?? selectedOffice?.id,
      Latitude: selectedOffice?.lat,
      Longitude: selectedOffice?.long,
    });

    handleCloseModal();
  };

  useImperativeHandle(ref, () => ({
    onCheckInOut: handleOpenModal,
  }));

  const hasMultipleOffices = (matchedOffice?.length ?? 0) > 1;

  return (
    <HMAModalOrganism
      isVisible={!!state}
      avatarProps={{ source: require('src/assets/color-icons/gps.png') }}
      descriptionProps={
        hasMultipleOffices
          ? {
              children: `Select the office you want to check ${state} for:`,
            }
          : {
              children: `You are about to check ${state} for ${
                selectedOffice?.name ?? matchedOffice?.[0]?.name
              }`,
            }
      }
    >
      {hasMultipleOffices ? (
        <>
          <HMADivider />
          <View style={{ gap: 8 }}>
            {matchedOffice?.map((office: any, index: number) => {
              const isSelected = selectedOffice?.id === office.id;

              return (
                <TouchableOpacity
                  key={office?.id ?? `${office?.name}-${index}`}
                  onPress={() => setSelectedOffice(office)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: isSelected ? colors.primary : colors.border,
                    backgroundColor: isSelected
                      ? colors.primary + '20'
                      : colors.background,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    marginBottom: 8,
                  }}
                >
                  <HMAText size="small">{office?.name}</HMAText>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      ) : null}
      <HMADivider />

      <View style={{ flexDirection: 'row' }}>
        <HMAButton
          variant="ghost"
          color="error"
          size="sm"
          style={{ flex: 1 }}
          title="Cancel"
          onPress={handleCloseModal}
        />
        <HMADivider variant="vertical" />
        <HMAButton
          variant="ghost"
          color="success"
          size="sm"
          style={{ flex: 1 }}
          title="Ok"
          onPress={handleConfirm}
        />
      </View>
    </HMAModalOrganism>
  );
}
