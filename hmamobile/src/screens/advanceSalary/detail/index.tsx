import { ScrollView, View } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import Toast from 'src/components/styled/atoms/toast';
import HMATextInputMolecule from 'src/components/styled/molecules/input';
import HMAModalTemplate from 'src/components/styled/template/modal';
import { jsDateToDDMMYYYY } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import useDetail from './useDetail';

export default function AdvanceSalaryDetail() {
  const { spacing, metrics, colors } = useTheme();
  const {
    handleRequest,
    isPending,
    setState,
    state,
    isOpenConfirmation,
    setIsOpenConfirmation,
    toastRef,
  } = useDetail();
  return (
    <Container>
      <ScrollView>
        <HMACard
          style={{
            padding: spacing.md,
            borderRadius: metrics.radius.lg,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ width: 40 }}>
            <HMAText>QAR</HMAText>
          </View>
          <View style={{ flex: 1 }}>
            <HMAText align="center" style={{ letterSpacing: 1.4 }}>
              Advance Amount
            </HMAText>
            <HMATextInputMolecule
              keyboardType="numeric"
              isPlaceholderAsLabel={false}
              style={{ marginVertical: spacing.sm, textAlign: 'center' }}
              fontSize="title"
              value={String(state.advance)}
              placeholder="0"
              onChangeText={advance =>
                setState(prev => ({ ...prev, advance: +advance }))
              }
            />
            <HMAText align="center" size="small" color="textSecondary">
              * Required · Must be greater than 0
            </HMAText>
          </View>

          <View style={{ width: 40 }}></View>
        </HMACard>
        <HMADivider />
        <HMATextInputMolecule
          label="Date"
          placeholder={jsDateToDDMMYYYY(new Date())}
          style={{ backgroundColor: colors.background }}
          editable={false}
        />
        <HMADivider />
        <HMATextInputMolecule
          onChangeText={reason => setState(prev => ({ ...prev, reason }))}
          value={state?.reason}
          label="Reason (Optional)"
          placeholder="e.g. Medical expense, house rent…"
          multiline
          style={{
            backgroundColor: colors.background,
            height: 100,
            textAlignVertical: 'top',
          }}
        />
      </ScrollView>
      <HMAButton
        title="Submit Request"
        disabled={!(state?.advance > 0)}
        onPress={() => setIsOpenConfirmation(true)}
        isLoading={isPending}
      />
      <HMAModalTemplate
        isVisible={isOpenConfirmation}
        descriptionProps={{ children: 'Do you want to request advance salary' }}
        cancelTextProps={{
          onPress: () => setIsOpenConfirmation(false),
        }}
        okTextProps={{
          onPress: () => {
            handleRequest();
            setIsOpenConfirmation(false);
          },
        }}
      />
      <Toast ref={toastRef} />
    </Container>
  );
}
