import { useTheme } from 'src/hooks/useTheme';
import ProfileCard from '../component';
import { View } from 'react-native';
import HMAText from 'src/components/styled/atoms/text';
import { cStyle } from 'src/utils/style';
import HMADivider from 'src/components/styled/atoms/divider';
import isEmpty from 'lodash/isEmpty';

export default function Bank({ bank }: { bank?: any }) {
  return (
    <ProfileCard title="Bank">
      {isEmpty(bank?.accounts) ? (
        <>
          <HMAText align="center">No Bank Found..</HMAText>
          <HMADivider />
        </>
      ) : (
        bank?.accounts?.map((item: any, index: number) => (
          <SepBank
            key={item?.id}
            bank={item}
            isLast={bank?.accounts?.length == index + 1}
          />
        ))
      )}
    </ProfileCard>
  );
}

const SepBank = ({ bank, isLast }: { bank: any; isLast: boolean }) => {
  const { spacing } = useTheme();

  return (
    <View>
      <HMAText>{bank?.bank_name}</HMAText>
      <HMAText size="small" color="textSecondary">
        Iban: {bank?.iban}
      </HMAText>
      <HMAText size="small" color="textSecondary">
        Branch: {bank?.branch_name || '-'}
      </HMAText>
      {isLast ? (
        <View style={{ paddingTop: spacing.md }} />
      ) : (
        <HMADivider thickness={1} space={'md'} />
      )}
    </View>
  );
};
