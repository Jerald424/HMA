import { FlatList, TouchableOpacity, View } from 'react-native';
import { useLandingContext } from '../landing/context';
import { cStyle } from 'src/utils/style';
import HMAAvatar from 'src/components/styled/atoms/avatar';
import { useAuth } from 'src/redux/hooks';
import HMAText from 'src/components/styled/atoms/text';
import HMADivider from 'src/components/styled/atoms/divider';
import { useMemo, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import HMACheckBox from 'src/components/styled/atoms/checkbox';
import HMAButton from 'src/components/styled/atoms/button';
import HMATextInputMolecule from 'src/components/styled/molecules/input';
import { useTheme } from 'src/hooks/useTheme';

export default function List() {
  const { employee, onSync } = useLandingContext();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const { colors } = useTheme();

  const filteredList = useMemo(
    () =>
      !!search
        ? employee?.filter(item =>
            item?.name?.toLowerCase().includes(search?.toLowerCase()),
          )
        : employee,
    [search, employee],
  );

  const handleSelect = (emp: any) => {
    setSelected(tmp => {
      const list = cloneDeep(tmp);
      const index = list?.findIndex(item => item?.id == emp?.id);
      if (index !== -1) {
        list?.splice?.(index, 1);
      } else list?.push(emp);
      return list;
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <HMATextInputMolecule
        value={search}
        onChangeText={setSearch}
        style={{ backgroundColor: colors.background }}
        placeholder="Search.."
      />
      <HMADivider />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredList}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={[cStyle.rowAlign]}
            >
              <HMAAvatar
                source={{ uri: item?.imageUrl }}
                style={{ resizeMode: 'cover', borderRadius: 50 }}
              />
              <HMADivider variant="vertical" />
              <HMAText style={{ flex: 1 }}>{item?.name}</HMAText>
              <HMACheckBox value={selected?.some(em => em?.id == item?.id)} />
            </TouchableOpacity>
            <HMADivider />
          </>
        )}
      />
      {selected?.length > 0 && (
        <HMAButton
          title="Init Separate"
          onPress={() => {
            onSync({ selectedEmp: selected });
            setSelected([]);
          }}
        />
      )}
    </View>
  );
}
