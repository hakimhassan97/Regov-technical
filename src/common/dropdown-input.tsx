import BottomSheet from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef} from 'react';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Styles from '../utils/styles';
import {Props} from './props';

interface BottomSheetProps extends Props {
  title?: string;
  data: any[];
  onChange: CallableFunction;
}

const DropDownInput = ({
  route,
  navigation,
  title,
  data,
  onChange,
}: BottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <View style={[Styles.container, Styles.marginTop10]}>
      {title && <Text>{title}</Text>}
      <Dropdown
        style={[
          Styles.dropdown
        ]}
        data={data || []}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        searchPlaceholder="Search..."
        onChange={item => {
          onChange(item);
        }}
      />
    </View>
  );
};

export default DropDownInput;
