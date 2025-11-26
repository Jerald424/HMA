import { useUserInfo } from 'src/redux/hooks';
import ProfileCard from '../component';
import { View } from 'react-native';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useMemo } from 'react';
import { cStyle } from 'src/utils/style';
import HMAIcon from 'src/components/styled/atoms/icon';
import isEmpty from 'lodash/isEmpty';

export default function Offices() {
  const { data } = useUserInfo();
  const { spacing } = useTheme();

  const sortedOffices = useMemo(() => {
    try {
      return [...data?.offices]?.sort?.(
        (a, b) => Number(b.active) - Number(a.active),
      );
    } catch (error) {
      return data?.offices;
    }
  }, [data]);

  return (
    <ProfileCard title="Allowed Work Locations">
      <View style={{ paddingTop: spacing.md }} />
      {isEmpty(sortedOffices) ? (
        <>
          <HMAText>No offices found</HMAText>
          <View style={{ paddingTop: spacing.md }} />
        </>
      ) : (
        sortedOffices?.map((office: any, index: number, arr: any) => (
          <Office
            office={office}
            key={office?.id}
            isLast={arr?.length == index + 1}
          />
        ))
      )}
    </ProfileCard>
  );
}

const Office = ({ office, isLast }: { office: any; isLast: boolean }) => {
  const { spacing } = useTheme();

  return (
    <View>
      <HMAText>{office?.name}</HMAText>
      <View style={[cStyle.row, { alignItems: 'baseline' }]}>
        <HMAText
          style={{ flex: 1, marginRight: spacing?.md }}
          size="small"
          color="textSecondary"
        >
          {office?.company}
        </HMAText>
        {!office?.active && (
          <HMAIcon
            // style={{ marginRight: spacing?.md }}
            name="history"
            variant="warning"
          />
        )}
        {/* <HMAIcon name="h_three_dot" variant="textSecondary" /> */}
      </View>
      {isLast ? (
        <View style={{ paddingTop: spacing.md }} />
      ) : (
        <HMADivider thickness={1} space={'md'} />
      )}
    </View>
  );
};
