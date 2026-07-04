import { TouchableOpacity, View } from 'react-native';
import HeaderWithBackIcon from 'src/components/layout/headerWithBackIcon';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import HMAOtp from 'src/components/styled/molecules/otp';
import ResendTimer from './timer';
import { useLoginOtp } from './useOtp';
import HMAAlert from 'src/components/styled/template/modal/alert';

const OTP_LENGTH = 6;

export default function LoginOtp({ navigation }) {
  const {
    handleVerify,
    isResendEnabled,
    onResendInitiate,
    resendCount,
    isLoadingResend,
    isLoadingVerifyOtp,
    otp,
    setOtp,
    routeData,
    setIsResendEnabled,
    alertRef,
  } = useLoginOtp();

  return (
    <Container>
      <HeaderWithBackIcon
        title="Back to login"
        onPressBack={navigation.goBack}
      />
      <HMADivider space={'lg'} />
      <HMAText align="center" size="title">
        We are just sent an SMS
      </HMAText>
      <HMADivider />
      <HMAText align="center" color="textSecondary">
        {routeData?.message}
      </HMAText>
      <HMADivider space={'md'} />
      <HMAOtp count={OTP_LENGTH} setValue={setOtp} value={otp} />
      <HMADivider space={'md'} />
      <HMAButton
        onPress={handleVerify}
        disabled={otp?.length !== OTP_LENGTH}
        title="VERIFY"
      />
      <HMADivider />
      <HMAText align="center">Did't receive the code?</HMAText>
      <HMADivider />

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity hitSlop={10} onPress={onResendInitiate}>
          <HMAText
            variant="title"
            color="primary"
            style={{ opacity: isResendEnabled ? 1 : 0.5 }}
          >
            Resend
          </HMAText>
        </TouchableOpacity>
        <ResendTimer
          isResendEnabled={isResendEnabled}
          key={resendCount}
          duration={120}
          onResendEnabled={() => setIsResendEnabled(true)}
        />
      </View>
      <HMAModalLoader isVisible={isLoadingResend || isLoadingVerifyOtp} />
      <HMAAlert ref={alertRef} />
    </Container>
  );
}
