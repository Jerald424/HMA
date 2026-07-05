import HMAButton from 'src/components/styled/atoms/button';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import HMAModalTemplate from 'src/components/styled/template/modal';
import usePickAndUpload from './pickAndUpload';
import Toast from 'src/components/styled/atoms/toast';

export default function UploadEvidence({ expense_id }: { expense_id: number }) {
  const {
    handlePick,
    file,
    setFile,
    handleUpload,
    isLoadingEvidence,
    toastRef,
  } = usePickAndUpload({ expense_id });
  return (
    <>
      <HMAButton
        leftIcon="clip"
        style={{ flex: 1 }}
        title="Evidence"
        onPress={handlePick}
        color="textSecondary"
      />

      <HMAModalTemplate
        variant="info"
        isVisible={!!file}
        descriptionProps={{ children: `Do want to upload ${file?.name}` }}
        cancelTextProps={{
          onPress: () => setFile(undefined),
        }}
        okTextProps={{
          onPress: handleUpload,
        }}
      />
      <HMAModalLoader isVisible={isLoadingEvidence} />
      <Toast ref={toastRef} showMs={10000} />
    </>
  );
}
