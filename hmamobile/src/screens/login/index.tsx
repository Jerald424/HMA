import { ScrollView, View } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import HMAForm from 'src/components/styled/organism/form';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import { SCREEN_WIDTH } from 'src/utils/variables';
import { loginStyle } from './style';
import useLogin from './useLogin';
import ModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import HMAModalTemplate from 'src/components/styled/template/modal';
import HMAErrorModal from 'src/components/styled/template/modal/errorModal';

export default function Login({ navigation }) {
  const { colors, spacing, metrics } = useTheme();
  const { control, formData, handleSubmit, isPending } = useLogin();

  return (
    <Container
      padding={0}
      backgroundColor="primary"
      safeAreaViewProps={{ edges: ['left', 'right'] }}
    >
      <View style={[{ flex: 1.2 }, cStyle.rowJustify]}>
        <HMAText color="background" size="title">
          BRAND NAME
        </HMAText>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: colors?.background,
          borderTopEndRadius: metrics?.radius?.lg,
          borderTopStartRadius: metrics?.radius?.lg,
          padding: spacing.lg,
        }}
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
          <HMAText size="large" align="center">
            Enter Credential To Login
          </HMAText>
          <HMADivider space={'md'} />
          <HMAForm data={formData} control={control} />

          <HMAButton
            isLoading={isPending}
            title="Login"
            onPress={handleSubmit}
          />
        </ScrollView>
      </View>
      <HMAErrorModal />
    </Container>
  );
}
