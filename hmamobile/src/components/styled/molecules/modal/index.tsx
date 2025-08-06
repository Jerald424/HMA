import { useTheme } from 'src/hooks/useTheme';
import HMAModal, { HMAModalProps } from '../../atoms/modal';
import { metrics } from 'src/theme/metrics';

export interface HMAModalMoleculeProps extends HMAModalProps {
  borderRadius?: keyof (typeof metrics)['radius'];
}
export default function HMAModalMolecule({
  borderRadius,
  ...props
}: HMAModalMoleculeProps) {
  const { metrics } = useTheme();
  return (
    <HMAModal
      {...props}
      containerProps={{
        ...props?.containerProps,
        style: [
          {
            borderRadius: borderRadius ? metrics?.radius?.[borderRadius] : 0,
            overflow: 'hidden',
          },
          props?.containerProps?.style,
        ],
      }}
    ></HMAModal>
  );
}
