import Container from 'src/components/styled/atoms/container';
import useCreate from './useCreate';
import HMAForm from 'src/components/styled/organism/form';
import { ScrollView } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import Toast from 'src/components/styled/atoms/toast';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import HMAAlert from 'src/components/styled/template/modal/alert';
import HMABadge from 'src/components/styled/atoms/badge';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { blendWithWhite } from 'src/function/colorCorrection';
import { withOpacity } from 'src/utils/withOpacity';

export default function LeaveCreate() {
  const {
    formData,
    control,
    handleSubmit,
    toastRef,
    isLoading,
    dayDuration,
    field2,
  } = useCreate();
  const { colors, spacing } = useTheme();
  return (
    <Container backgroundColor="background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HMAForm data={formData} control={control} />
        <HMAText
          color="info"
          style={{
            backgroundColor: withOpacity(colors.info, 0.2),
            padding: spacing.sm,
            marginBottom: spacing.sm,
          }}
          children={`Day Duration: ${dayDuration}`}
        />
        <HMAForm data={field2} control={control} />
      </ScrollView>
      <HMAButton title="Submit" onPress={handleSubmit} />
      <Toast ref={toastRef} showMs={10000} />
      <HMAModalLoader isVisible={isLoading} />
    </Container>
  );
}
