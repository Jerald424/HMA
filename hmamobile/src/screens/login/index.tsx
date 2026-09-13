import { ScrollView, TouchableOpacity, View } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import HMAForm from 'src/components/styled/organism/form';
import HMAAlert from 'src/components/styled/template/modal/alert';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import { SCREEN_WIDTH } from 'src/utils/variables';
import { loginStyle } from './style';
import useLogin from './useLogin';
import HMAAvatar from 'src/components/styled/atoms/avatar';
import HMACard from 'src/components/styled/atoms/card';
import HMACheckBox from 'src/components/styled/atoms/checkbox';

export default function Login() {
  const { colors, spacing, metrics } = useTheme();
  const {
    control,
    formData,
    handleSubmit,
    isPending,
    alertRef,
    isRemember,
    setIsRemember,
  } = useLogin();

  return (
    <Container
      padding={'lg'}
      backgroundColor="background"
      safeAreaViewProps={{ edges: ['left', 'right', 'top'] }}
    >
      <View
        style={
          {
            // flex: 3,
            // backgroundColor: colors?.background,
            // borderTopEndRadius: metrics?.radius?.lg,
            // borderTopStartRadius: metrics?.radius?.lg,
            // padding: spacing.lg,
          }
        }
      >
        <View
          style={[
            loginStyle.absView,
            {
              backgroundColor: colors.background,
              width: SCREEN_WIDTH - spacing.md * 2,
              borderRadius: metrics?.radius?.lg,
            },
          ]}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HMAAvatar
            size="md"
            style={{ alignSelf: 'center', borderRadius: metrics.radius.lg }}
            source={require('src/assets/images/hma-orbit-app-icon-1024.png')}
          />
          <HMADivider />
          <HMAText size="title" color="textSecondary" align="center">
            Login
          </HMAText>

          <HMADivider space={'md'} />
          <HMAForm data={formData} control={control} />
          <View style={[cStyle.rowAlign]}>
            <HMACheckBox
              hitSlop={20}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <HMAText style={{ flex: 1, marginLeft: spacing.md }}>
              Remember me
            </HMAText>
          </View>
          <HMADivider space={'md'} />

          <HMAButton
            isLoading={isPending}
            title="Login"
            onPress={handleSubmit}
          />
        </ScrollView>
      </View>
      <HMAAlert ref={alertRef} />
    </Container>
  );
}
