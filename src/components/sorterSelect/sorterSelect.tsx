import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { onChangeCallBack } from '../../common/appUtil';
import { SORTER_ALGORITHM } from '../../common/enums/sorterAlgorithm';
import { ChangeEvent } from 'react';
import './sortSelect.scss';

export interface SorterSelectProps {
  value: SORTER_ALGORITHM;
  onChange: onChangeCallBack<SORTER_ALGORITHM>;
}

export function SorterSelect(props: SorterSelectProps) {
  const { value } = props;

  const onSelectChange = (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    console.log(e.target.name);
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
        </MenuItem>
      </Select>
    </FormControl>
  );
}
