import { useEffect, useRef } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import HMABottomSheet from 'src/components/styled/atoms/bottomSheet';
import HMACheckBox from 'src/components/styled/atoms/checkbox';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';
import { SCREEN_HEIGHT } from 'src/utils/variables';

export default function OfficeList() {
  const officesRef = useRef(null);
  const { spacing, colors, metrics } = useTheme();
  const { data: userInfo } = useUserInfo();

  useEffect(() => {
    officesRef?.current?.open?.();
  }, []);
  return (
    <HMABottomSheet
      ref={officesRef}
      customStyles={{ container: { height: 'auto' } }}
    >
      <View style={{ padding: spacing?.md, maxHeight: SCREEN_HEIGHT - 100 }}>
        <HMAText size="large">Offices</HMAText>
        <HMADivider thickness={1} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {userInfo?.offices?.map((office: any) => (
            <View key={office?.id}>
              <TouchableOpacity
                style={[
                  cStyle.row,
                  {
                    padding: spacing.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: metrics?.radius?.sm,
                  },
                ]}
              >
                <HMACheckBox isRadio />
                <HMAText style={{ flex: 1, marginLeft: spacing.md }}>
                  {office?.name}
                </HMAText>
              </TouchableOpacity>
              <HMADivider />
            </View>
          ))}
        </ScrollView>
      </View>
    </HMABottomSheet>
  );
}
