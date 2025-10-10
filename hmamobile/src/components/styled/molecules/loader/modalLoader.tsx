import HMALoader from '../../atoms/loader';
import HMAModal, { HMAModalProps } from '../../atoms/modal';

export default function HMAModalLoader(props: HMAModalProps) {
  return (
    <HMAModal
      {...props}
      containerProps={{ style: { backgroundColor: '#00000000' } }}
    >
      <HMALoader size={'large'} />
    </HMAModal>
  );
}
