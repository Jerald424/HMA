import HMADivider from 'src/components/styled/atoms/divider';
import HMALoader from 'src/components/styled/atoms/loader';

export default function FooterLoader() {
  return (
    <>
      <HMADivider />
      <HMALoader size={'large'} />
      <HMADivider />
    </>
  );
}
