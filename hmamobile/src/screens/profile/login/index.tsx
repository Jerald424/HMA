import { TouchableOpacity, View } from 'react-native';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import HMAModalTemplate from 'src/components/styled/template/modal';
import { useTheme } from 'src/hooks/useTheme';
import useLogin from './useLogin';

export default function Login() {
  const { colors, spacing } = useTheme();
  const { isShowLogout, setIsShowLogout, onLogout, isLoadingLogout } =
    useLogin();
  return (
    <View
      style={{
        backgroundColor: colors?.background,
        paddingHorizontal: spacing?.md,
      }}
    >
      <HMADivider space={'sm'} />
      <HMAText color="textSecondary">Login</HMAText>
      <TouchableOpacity
        onPress={() => setIsShowLogout(true)}
        style={{ paddingVertical: spacing.md }}
      >
        <HMAText color="error">Log out</HMAText>
      </TouchableOpacity>
      <HMAModalTemplate
        isVisible={isShowLogout}
        descriptionProps={{ children: 'Do you want to logout.' }}
        cancelTextProps={{
          onPress: () => setIsShowLogout(false),
        }}
        okTextProps={{
          onPress: onLogout,
        }}
      />
      <HMAModalLoader isVisible={isLoadingLogout} />
    </View>
  );
}
