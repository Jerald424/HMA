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
import HMADatePickerMolecule from 'src/components/styled/molecules/datePicker';

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

  const btnEnabled = state?.advance > 0;
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
        <HMADatePickerMolecule
          mode="date"
          date={state.date}
          style={{ backgroundColor: colors.background }}
          onDateChange={date => setState(prev => ({ ...prev, date }))}
        />
        {/* <HMATextInputMolecule
          label="Date"
          placeholder={jsDateToDDMMYYYY(new Date())}
          style={{ backgroundColor: colors.background }}
          editable={false}
        /> */}
        <HMADivider />
        <HMATextInputMolecule
          onChangeText={reason => setState(prev => ({ ...prev, reason }))}
          value={state?.reason}
          label="Reason"
          placeholder="e.g. Medical expense, house rent…"
          multiline
          style={{
            backgroundColor: colors.background,
            height: 100,
            textAlignVertical: 'top',
          }}
        />
        {/* <HMAText size="small" color="textSecondary">
          * Required
        </HMAText> */}
      </ScrollView>
      <HMAButton
        title="Submit Request"
        disabled={!btnEnabled}
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
