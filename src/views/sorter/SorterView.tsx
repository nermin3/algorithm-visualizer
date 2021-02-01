import './sorter.scss';
import { useEffect, useState } from 'react';
import { SorterSubMenu } from './SorterSubMenu';
import { SORTER_ALGORITHM } from '../../common/enums';
import { onChangeCallBack } from '../../common/appUtil';
import { Observable } from 'rxjs';

interface SorterViewProps {
  array: number[];
  algorithm: SORTER_ALGORITHM;
  updateAlgorithm: onChangeCallBack<SORTER_ALGORITHM>;
  arrayObservable: Observable<number[]>;
  algorithmObservable: Observable<SORTER_ALGORITHM>;
}

export function SorterView(props: SorterViewProps) {
  const {
    array: arrayProp,
    algorithm: algorithmProp,
    updateAlgorithm,
    arrayObservable,
    algorithmObservable,
  } = props;

  const [array, setArray] = useState<number[]>(arrayProp);
  const [algorithm, setAlgorithm] = useState<SORTER_ALGORITHM>(algorithmProp);

  useEffect(() => {
    const observableSubscription = arrayObservable.subscribe((value) => {
      setArray([...value]);
    });

    const algorithmSubscription = algorithmObservable.subscribe((value) => {
      setAlgorithm(value);
    });

    return () => {
      observableSubscription.unsubscribe();
      algorithmSubscription.unsubscribe();
    };
  }, []);

  if (!array) {
    return null;
  }

  return (
    <div className="sorterViewRoot">
      <SorterSubMenu value={algorithm} onChange={updateAlgorithm} />
      <div className="sorterVisualizer">
        {array.map((value, index) => (
          <div key={index} className={'element' + value} />
        ))}
      </div>
    </div>
  );
}
