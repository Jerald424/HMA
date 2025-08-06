import { View } from 'react-native';
import HMAText from '../../atoms/text';
import HMAModalMolecule, { HMAModalMoleculeProps } from '../../molecules/modal';

interface HMAModalOrganismProps extends HMAModalMoleculeProps {}

export default function HMAModalOrganism({ ...props }: HMAModalOrganismProps) {
  return (
    <HMAModalMolecule {...props} borderRadius="md">
      <View style={{ padding: 10, backgroundColor: 'red' }}>
        <HMAText>HEADING</HMAText>
      </View>
      <View style={{ padding: 10 }}>
        <HMAText align="center">DESCRIPTION</HMAText>
      </View>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <HMAText style={{ flex: 1 }} align="center">
          DESCRIPTION
        </HMAText>
        <HMAText style={{ flex: 1 }} align="center">
          DESCRIPTION
        </HMAText>
      </View>
    </HMAModalMolecule>
  );
}
