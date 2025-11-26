import HMAButton, { HMAButtonProps } from 'src/components/styled/atoms/button';

export default function InOutButton({
  isIn,
  ...props
}: { isIn?: boolean } & HMAButtonProps) {
  return (
    <HMAButton
      {...props}
      style={{ borderRadius: 50 }}
      leftIcon={isIn ? 'enter' : 'exit'}
      title={`CHECK ${isIn ? 'IN' : 'OUT'}`}
      color={isIn ? 'success' : 'error'}
    ></HMAButton>
  );
}
