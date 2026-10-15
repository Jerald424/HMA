import { useQuery } from '@tanstack/react-query';
import { FlatList, RefreshControl, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMABadge from 'src/components/styled/atoms/badge';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { blendWithWhite } from 'src/function/colorCorrection';
import { useTheme } from 'src/hooks/useTheme';
import axiosInstance from 'src/services/axiosInstance';
import { HAIRLINE_WIDTH } from 'src/utils/variables';

const getEquipmentList = async () => {
  return axiosInstance.post('/api/employee/equipments/list', {
    params: {
      limit: 200, // Optional
    },
  });
};

export default function EquipmentListScreen() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ['equipmentList'],
    queryFn: getEquipmentList,
  });

  const list = data?.result?.records;
  return (
    <Container>
      <FlatList
        data={list}
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isPending} />
        }
        ListEmptyComponent={() => (isPending ? <></> : <NoData />)}
        renderItem={({ item }) => <SepEquipment equipment={item} />}
      />
    </Container>
  );
}
const SepEquipment = ({ equipment }) => {
  const { metrics, spacing, colors } = useTheme();
  return (
    <>
      <HMACard
        cmpType="View"
        style={{ borderRadius: metrics.radius.md, padding: spacing.md }}
      >
        <HMAText variant="title">{equipment.name}</HMAText>
        <HMADivider space={'xxs'} />
        <HMABadge color="success" size="xs" label={equipment?.category?.name} />
        <HMADivider />
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              borderWidth: HAIRLINE_WIDTH,
              padding: spacing.sm,
              borderColor: colors.lightBackground,
            }}
          >
            <HMAText color="textSecondary" size="small">
              📍 Location
            </HMAText>
            <HMAText
              color="textSecondary"
              size="small"
              style={{ marginLeft: spacing.md }}
              variant="large"
            >
              {equipment?.location || 'N/A'}
            </HMAText>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: HAIRLINE_WIDTH,
              padding: spacing.sm,
              borderColor: colors.lightBackground,
            }}
          >
            <HMAText color="textSecondary" size="small">
              📅 Assign Date
            </HMAText>
            <HMAText
              color="textSecondary"
              size="small"
              style={{ marginLeft: spacing.md }}
              variant="large"
            >
              {equipment?.assign_date || 'N/A'}
            </HMAText>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              borderWidth: HAIRLINE_WIDTH,
              padding: spacing.sm,
              borderColor: colors.lightBackground,
            }}
          >
            <HMAText color="textSecondary" size="small">
              𝄃𝄂 {'  '}Barcode
            </HMAText>
            <HMAText
              color="textSecondary"
              size="small"
              style={{ marginLeft: spacing.md }}
              variant="large"
            >
              {equipment?.barcode || 'N/A'}
            </HMAText>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: HAIRLINE_WIDTH,
              padding: spacing.sm,
              borderColor: colors.lightBackground,
            }}
          >
            <HMAText color="textSecondary" size="small">
              #️⃣ Serial No
            </HMAText>
            <HMAText
              color="textSecondary"
              size="small"
              style={{ marginLeft: spacing.md }}
              variant="large"
            >
              {equipment?.serial_no || 'N/A'}
            </HMAText>
          </View>
        </View>
        <HMADivider />
        <View
          style={{
            backgroundColor: blendWithWhite(colors.success, 0.9),
            padding: spacing.sm,
            borderRadius: metrics.radius.sm,
          }}
        >
          <HMAText color="success" size="xs">
            ℹ️ {'  '}{' '}
            {equipment?.project
              ? JSON.stringify(equipment?.project)
              : 'Project Not Assigned'}
          </HMAText>
        </View>
      </HMACard>
      <HMADivider />
    </>
  );
};
