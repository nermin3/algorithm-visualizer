import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { onChangeCallBack } from '../../common/appUtil';
import { SORTER_ALGORITHM } from '../../common/enums';
import { ChangeEvent } from 'react';
import './sortSelect.scss';

export interface SorterSelectProps {
  value: SORTER_ALGORITHM;
  onChange: onChangeCallBack<SORTER_ALGORITHM>;
}

export function SorterSelect(props: SorterSelectProps) {
  const { value, onChange } = props;

  const onSelectChange = (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    onChange(e.target.value as SORTER_ALGORITHM)
  };

  return (
    <FormControl className="sortSelect">
      <InputLabel id="sorter-algorithm-select-label">
        Sorter algorithm
      </InputLabel>
      <Select
        labelId="sorter-algorithm-select-label"
        value={value}
        onChange={onSelectChange}
      >
        <MenuItem value={SORTER_ALGORITHM.BUBBLE_SORT}>Bubble sort</MenuItem>
        <MenuItem value={SORTER_ALGORITHM.SELECTION_SORT}>
          Selection sort
        </MenuItem>
        <MenuItem value={SORTER_ALGORITHM.INSERTION_SORT}>
          Insertion sort
        </MenuItem>{' '}
        <MenuItem value={SORTER_ALGORITHM.MERGE_SORT}>Merge sort</MenuItem>
      </Select>
    </FormControl>
  );
}
